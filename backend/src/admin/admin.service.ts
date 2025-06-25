import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'; // Added InternalServerErrorException
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../entities/enums/role.enum';
import * as argon from 'argon2';
import { StartupService } from '../startup/startup.service'; // Import StartupService
import { Startup } from '../entities/startup.entity'; // Import Startup entity
import { CreateStartupDto } from './dto/create-startup.dto'; // Import CreateStartupDto
import { UpdateStartupDto } from './dto/update-startup.dto'; // Import UpdateStartupDto
import { AdminLoginDto } from './dto/admin-login.dto'; // Import AdminLoginDto

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly startupService: StartupService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, role } = createUserDto;

    await this.authService.signup({
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || '',
    });

    const users = await this.userService.getUserByString(email);
    if (users.length > 0) {
      const createdUser = users[0];
      if (createdUser.role !== role) {
        const updatedUserWithRole = await this.userService.update(createdUser.id, { role });
        if (!updatedUserWithRole) {
          throw new InternalServerErrorException(`Could not update role for user ID "${createdUser.id}" after creation.`);
        }
        return updatedUserWithRole;
      }
      return createdUser;
    }
    throw new InternalServerErrorException('Could not retrieve user after creation via signup.');
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.getUserById(id); // Ensures user exists

    const { password: newPassword, ...userData } = updateUserDto;
    const updateData: Partial<User> = { ...userData };

    if (newPassword) {
      updateData.hash = await argon.hash(newPassword);
    }

    const updatedUser = await this.userService.update(id, updateData);
    if (!updatedUser) {
      throw new InternalServerErrorException(`User with ID "${id}" could not be updated`);
    }
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id); // Ensures user exists before attempting delete
    await this.userService.remove(id);
  }

  async getAllStartups(): Promise<Startup[]> {
    return this.startupService.findAll();
  }

  async getStartupById(id: number): Promise<Startup> {
    const startup = await this.startupService.getStartupById(id);
    if (!startup) {
      throw new NotFoundException(`Startup with ID "${id}" not found`);
    }
    return startup;
  }

  async createStartup(createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
      return await this.startupService.create(createStartupDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not create startup. ' + error.message);
    }
  }

  async updateStartup(id: number, updateStartupDto: UpdateStartupDto): Promise<Startup> {
    await this.getStartupById(id); // Ensures startup exists

    try {
      const updatedStartup = await this.startupService.update(id, updateStartupDto);
      if (!updatedStartup) {
        throw new InternalServerErrorException(`Startup with ID "${id}" could not be updated`);
      }
      return updatedStartup;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update startup. ' + error.message);
    }
  }

  async deleteStartup(id: number): Promise<void> {
    await this.getStartupById(id); // Ensures startup exists before attempting delete
    await this.startupService.remove(id);
  }

  async authenticateAdmin(loginDto: AdminLoginDto): Promise<User> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userService.getUserByString(email);
    if (user.length === 0) {
      throw new NotFoundException('Admin user not found');
    }

    const adminUser = user[0];

    // Check if user has Manager role (admin access)
    if (adminUser.role !== Role.Manager) {
      throw new NotFoundException('Access denied. Admin privileges required.');
    }

    // Verify password
    const passwordMatches = await argon.verify(adminUser.hash, password);
    if (!passwordMatches) {
      throw new NotFoundException('Invalid credentials');
    }

    return adminUser;
  }
}
