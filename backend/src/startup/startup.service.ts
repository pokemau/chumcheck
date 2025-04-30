import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StartupApplicationDto } from './dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { start } from 'repl';

@Injectable()
export class StartupService {
  constructor(private em: EntityManager) {}

  async getStartups(userId: number) {
    return await this.em.find(Startup, {
      user: userId,
    });
  }

  async getStartupById(startupId: number) {
    return await this.em.findOne(Startup, { id: startupId });
  }

  async getPendingStartupsRankingByUrat() {
    return await this.em.find(Startup, {}, { populate: ['mentors'] });
  }

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

  async getCalculatorFinalScores(startupId: number) {
    return {
      message: 'CALC FINAL SCORES',
    };
  }
}
