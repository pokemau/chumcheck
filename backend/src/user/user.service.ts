import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto';
import { Role } from 'src/entities/enums/role.enum';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private em: EntityManager) {}

  async getUser(userId: number) {
    const user = await this.em.findOne(User, { id: userId });
    if (!user)
      throw new NotFoundException(`User with id ${userId} does not exist.`);

    return {
      role: user.role,
    };
  }

  async create(dto: AuthDto) {
    const hashedPassword = await hash(dto.password);

    const user = new User();
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.hash = hashedPassword;

    return await this.em.persistAndFlush(user);
  }

  async findByEmail(email: string) {
    return await this.em.findOne(User, { email });
  }

  async findAll() {
    return await this.em.find(User, {});
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.em.findOne(User, { id });
  }

  async getUserByRole(userRole: Role) {
    const t = await this.em.find(User, {
      role: userRole,
    });
    console.log('=====================')
    console.log('=====================')
    console.log(t)
    console.log('=====================')
    console.log('=====================')

    return t;
  }

  async getUserByString(query: string) {
    return await this.em.find(User, {
      email: { $ilike: `%${query}%` },
    });
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const user = await this.findOneById(id);
    if (!user) {
      return null;
    }
    this.em.assign(user, data);
    await this.em.flush();
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (user) {
      await this.em.removeAndFlush(user);
    }
  }
}
