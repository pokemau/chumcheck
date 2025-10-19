import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'; // Added BadRequestException
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
import { EntityManager } from '@mikro-orm/postgresql';
import { ActivityLog } from '../entities/activity-log.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly startupService: StartupService,
    private readonly em: EntityManager,
  ) {}

  private async log(action: string, details: string, actor?: string) {
    const entry = this.em.create(ActivityLog, {
      action,
      details,
      actor,
      createdAt: new Date()
    });
    await this.em.persistAndFlush(entry);
  }

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

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, role } = createUserDto;

    // If user exists, just update role/password as needed
    const existing = await this.userService.findOneByEmail(email);
    if (existing) {
      const updateData: Partial<User> = { firstName, lastName, role };
      if (password) {
        updateData.hash = await argon.hash(password);
      }
      const updated = await this.userService.update(existing.id, updateData);
      if (!updated) throw new InternalServerErrorException('Could not update existing user.');
      await this.log('Admin', `Updated existing user ${email}`, 'admin');
      return updated;
    }

    // Otherwise sign up and then set role if needed
    await this.authService.signup({ email, password, firstName: firstName ?? '', lastName: lastName ?? '' });
    const created = await this.userService.findOneByEmail(email);
    if (!created) throw new InternalServerErrorException('Could not retrieve created user.');

    if (created.role !== role) {
      const withRole = await this.userService.update(created.id, { role });
      if (!withRole) throw new InternalServerErrorException('Could not set role for created user.');
      await this.log('Admin', `Created user ${email} with role ${role}`, 'admin');
      return withRole;
    }

    await this.log('Admin', `Created user ${email}`, 'admin');
    return created;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserById(id);

    const { password: newPassword, ...userData } = updateUserDto;
    const updateData: Partial<User> = { ...userData };

    if (newPassword && newPassword.trim().length > 0) {
      updateData.hash = await argon.hash(newPassword);
    }

    const updatedUser = await this.userService.update(id, updateData);
    if (!updatedUser) {
      throw new InternalServerErrorException(`User with ID "${id}" could not be updated`);
    }
    await this.log('Admin', `Updated user ${updatedUser.email}`, 'admin');
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id); // Ensures user exists before attempting delete

    // Prevent FK violation by checking startups that reference this user
    const startupCount = await this.em.count(Startup, { user: id });
    if (startupCount > 0) {
      throw new BadRequestException(
        `Cannot delete user ${user.email} – referenced by ${startupCount} startup(s). Reassign or delete their startups first.`
      );
    }

    await this.userService.remove(id);
    await this.log('Admin', `Deleted user ${user.email}`, 'admin');
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

  async createStartup(createStartupDto: CreateStartupDto) {
    try {
      const s = await this.startupService.adminCreate(createStartupDto);
      await this.log('Admin', `Created startup ${s.name}`, 'admin');
      return s;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not create startup. ' + (error?.message ?? ''));
    }
  }

  async updateStartup(id: number, updateStartupDto: UpdateStartupDto) {
    await this.getStartupById(id); // Ensures startup exists

    try {
      const updatedStartup = await this.startupService.update(id, updateStartupDto);
      if (!updatedStartup) {
        throw new InternalServerErrorException(`Startup with ID "${id}" could not be updated`);
      }
      await this.log('Admin', `Updated startup ${updatedStartup.name}`, 'admin');
      return updatedStartup;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update startup. ' + (error?.message ?? ''));
    }
  }

  async deleteStartup(id: number): Promise<void> {
    const s = await this.getStartupById(id); // Ensures startup exists before attempting delete
    await this.startupService.remove(id);
    await this.log('Admin', `Deleted startup ${s.name}`, 'admin');
  }
}
