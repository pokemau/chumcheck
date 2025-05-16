import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Rns } from 'src/entities/rns.entity';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { CreateRnsDto } from './dto';

@Injectable()
export class RnsService {
  constructor(private em: EntityManager) {}

  async getStartupRns(startupId: number) {
    const res = await this.em.find(
      Rns,
      { startup: { id: startupId } },
      { populate: ['user'] },
    );

    return res;
  }

  async createRns(dto: CreateRnsDto) {
    const rns = new Rns();
    rns.description = dto.description;

    // TODO: Fix priority number
    rns.priorityNumber = dto.priorityNumber;
    rns.startup = this.em.getReference(Startup, dto.startupId);
    rns.user = this.em.getReference(User, dto.assigneeId);
    rns.isAiGenerated = dto.isAiGenerated;

    await this.em.persistAndFlush(rns);
    return rns;
  }
}
