import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Roadblock } from 'src/entities/roadblock.entity';
import { CreateRoadblockDto, UpdateRoadblockDto } from './dto/roadblock.dto';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';

@Injectable()
export class RoadblockService {
    constructor(private readonly em: EntityManager) {}

    async getByStartupId(startupId: number): Promise<Roadblock[]> {
        return this.em.find(Roadblock, { startup: startupId }, { orderBy: { id: 'ASC' } });
    }

    async createRoadblock(dto: CreateRoadblockDto): Promise<Roadblock> {
        const roadblock = new Roadblock();
        roadblock.assignee = this.em.getReference(User, dto.assigneeId);
        roadblock.startup = this.em.getReference(Startup, dto.startupId);
        roadblock.isAiGenerated = dto.isAiGenerated;
        roadblock.status = dto.status;
        roadblock.riskNumber = dto.riskNumber;
        roadblock.description = dto.description;
        roadblock.fix = dto.fix;

        await this.em.persistAndFlush(roadblock);
        return roadblock;
    }

    async update(id: number, dto: UpdateRoadblockDto): Promise<Roadblock> {
    const roadblock = await this.em.findOneOrFail(Roadblock, id);

    if (dto.assigneeId !== undefined) {
        roadblock.assignee = this.em.getReference(User, dto.assigneeId);
    }
    if (dto.startupId !== undefined) {
        roadblock.startup = this.em.getReference(Startup, dto.startupId);
    }
    if (dto.isAiGenerated !== undefined) {
        roadblock.isAiGenerated = dto.isAiGenerated;
    }
    if (dto.status !== undefined) {
        roadblock.status = dto.status;
    }
    if (dto.riskNumber !== undefined) {
        roadblock.riskNumber = dto.riskNumber;
    }
    if (dto.description !== undefined) {
        roadblock.description = dto.description;
    }
    if (dto.fix !== undefined) {
        roadblock.fix = dto.fix;
    }

    await this.em.flush();
    return roadblock;
    }

    async delete(id: number) {
    const roadblock = await this.em.findOne(Roadblock, { id });
    if (!roadblock) throw new NotFoundException('Roadblock not found');

    await this.em.removeAndFlush(roadblock);
    return { message: 'Roadblock deleted successfully' };
    }
}
