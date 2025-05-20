import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Initiative } from 'src/entities/initiative.entity';
import { CreateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';
import { Rns } from 'src/entities/rns.entity';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';

@Injectable()
export class InitiativeService {
    constructor(private readonly em: EntityManager) {}

    async getStartupInitiative(startupId: number): Promise<Initiative[]> {
        return this.em.find(Initiative, { startup: startupId }, { orderBy: { id: 'ASC' } });
    }

    async createInitiative(dto: CreateInitiativeDto) {
        const initiative = new Initiative();
        initiative.initiativeNumber = dto.initiativeNumber;
        initiative.status = dto.status;
        initiative.rns = this.em.getReference(Rns, dto.rnsId);
        initiative.isAiGenerated = dto.isAiGenerated;
        initiative.assignee = this.em.getReference(User, dto.assigneeId);
        initiative.startup = this.em.getReference(Startup, dto.startupId);
        initiative.description = dto.description;
        initiative.measures = dto.measures;
        initiative.targets = dto.targets;
        initiative.remarks = dto.remarks;

        await this.em.persistAndFlush(initiative);
        return initiative;
    }

    async update(id: number, dto: UpdateInitiativeDto) {
    const initiative = await this.em.findOne(Initiative, { id });
    if (!initiative) throw new NotFoundException('Initiative not found');

    if (dto.initiativeNumber !== undefined) {
        initiative.initiativeNumber = dto.initiativeNumber;
    }

    if (dto.status !== undefined) {
        initiative.status = dto.status;
    }

    if (dto.isAiGenerated !== undefined) {
        initiative.isAiGenerated = dto.isAiGenerated;
    }

    if ((dto as any).rnsId !== undefined) {
        initiative.rns = this.em.getReference(Rns, dto.rnsId);
    }

    if ((dto as any).assigneeId !== undefined) {
        initiative.assignee = this.em.getReference(User, dto.assigneeId);
    }

    if ((dto as any).startupId !== undefined) {
        initiative.startup = this.em.getReference(Startup, dto.startupId);
    }

    if ((dto as any).description !== undefined) {
        initiative.description = dto.description;
    }

    if ((dto as any).measures !== undefined) {
        initiative.measures = dto.measures;
    }

    if ((dto as any).targets !== undefined) {
        initiative.targets = dto.targets;
    }

    if ((dto as any).remarks !== undefined) {
        initiative.remarks = dto.remarks;
    }

    await this.em.flush();
    return initiative;
    }


    async delete(id: number) {
        const initiative = await this.em.findOne(Initiative, { id });
        if (!initiative) throw new NotFoundException('Initiative not found');

        await this.em.removeAndFlush(initiative);
        return { message: 'Initiative deleted successfully' };
    }

}
