import { Injectable, NotFoundException } from '@nestjs/common';
import { StartupApplicationDto } from './dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class StartupService {
  constructor(private em: EntityManager) {}

  async createStartup(dto: StartupApplicationDto) {
    const startup = new Startup();

    const user = await this.em.findOne(User, { id: dto.userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} does not exist.`);
    }

    startup.name = dto.name;

    startup.user = user;
    startup.dataPrivacy = dto.dataPrivacy;
    startup.eligibility = dto.eligibility;

    await this.em.persistAndFlush(startup);
    return startup;
  }

  async findStartupById(startupId: number) {}
}
