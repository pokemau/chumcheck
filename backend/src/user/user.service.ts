import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/entities/enums/role.enum';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private em: EntityManager) {}

  async findAll() {
    return await this.em.find(User, {});
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.em.findOne(User, { id });
  }

  async getUserByRole(userRole: Role) {
    return await this.em.find(User, {
      role: userRole,
    });
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
