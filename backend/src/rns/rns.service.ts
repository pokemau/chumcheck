import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Rns } from 'src/entities/rns.entity';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { CreateRnsDto, UpdateRnsDto } from './dto';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';

@Injectable()
export class RnsService {
  constructor(private em: EntityManager) {}

  async getStartupRns(startupId: number) {
    const rns = await this.em.find(
      Rns,
      { startup: { id: startupId } },
      { populate: ['assignee', 'targetLevel'] },
    );

    return rns.map((r: Rns) => ({
      id: r.id,
      priorityNumber: r.priorityNumber,
      description: r.description,
      targetLevelId: r.targetLevel.id,
      isAiGenerated: r.isAiGenerated,
      status: r.status,
      readinessType: r.readinessType,
      startup: r.startup.id,
      assignee: r.assignee,
      targetLevelScore: r.getTargetLevelScore(),
    }));
  }

  async createRns(dto: CreateRnsDto) {
    const rns = new Rns();
    rns.priorityNumber = dto.priorityNumber;
    rns.description = dto.description;
    rns.targetLevel = this.em.getReference(ReadinessLevel, dto.targetLevelId);
    rns.isAiGenerated = dto.isAiGenerated;
    rns.readinessType = dto.readinessType;
    rns.startup = this.em.getReference(Startup, dto.startupId);
    rns.assignee = this.em.getReference(User, dto.assigneeId);
    rns.status = dto.status;

    await this.em.persistAndFlush(rns);
    return rns;
  }

  async deleteRns(rnsId: number) {
    const rns = await this.em.findOne(Rns, { id: rnsId });
    if (!rns) {
      throw new NotFoundException(`RNS with ID ${rnsId} does not exist.`);
    }

    await this.em.removeAndFlush(rns);
    return { message: `RNS with ID ${rnsId} deleted successfully.` };
  }

  async updateRns(rnsId: number, dto: UpdateRnsDto) {
    const rns = await this.em.findOne(Rns, { id: rnsId });

    if (!rns) {
      throw new NotFoundException(`RNS with ID ${rnsId} does not exist.`);
    }

    if (dto.readinessType) {
      rns.readinessType = dto.readinessType;
    }

    if (dto.assigneeId) {
      rns.assignee = this.em.getReference(User, dto.assigneeId);
    }

    if (dto.targetLevel) {
      rns.targetLevel = this.em.getReference(ReadinessLevel, dto.targetLevel);
    }

    if (dto.description) {
      rns.description = dto.description;
    }

    if (dto.status) {
      rns.status = dto.status;
    }

    if (dto.priorityNumber) {
      rns.priorityNumber = dto.priorityNumber;
    }

    await this.em.flush();
    return rns;
  }
}
