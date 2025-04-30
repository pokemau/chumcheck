import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/entities/enums/role.enum';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private em: EntityManager) {}

  async getUserByRole(userRole: Role) {
    return await this.em.find(User, {
      role: userRole,
    });
  }
}
