import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Roadblock } from 'src/entities/roadblock.entity';
import { CreateRoadblockDto, GenerateRoadblocksDto, UpdateRoadblockDto } from './dto/roadblock.dto';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';
import { AiService } from 'src/ai/ai.service';
import { RnsStatus } from 'src/entities/enums/rns.enum';
import { Rns } from 'src/entities/rns.entity';
import { Initiative } from 'src/entities/initiative.entity';
import { createBasePrompt } from 'src/ai/utils/prompt.utils';

@Injectable()
export class RoadblockService {
    constructor(private readonly em: EntityManager, private readonly aiService: AiService) {}

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

    async generateRoadblocks(dto: GenerateRoadblocksDto) {
        const startup = await this.em.findOneOrFail(Startup, { id: dto.startupId }, {
            populate: ['capsuleProposal', 'user'],
        });

        if (!startup.capsuleProposal) {
            throw new BadRequestException('No capsule proposal found.');
        }

        const basePrompt = await this.aiService.createBasePrompt(startup, this.em); // You'll implement this helper

        const excludeStatuses = [RnsStatus.Discontinued, RnsStatus.Completed];

        const tasks = await this.em.find(Rns, {
        startup: startup,
        status: { $nin: excludeStatuses },
        }, {
        populate: ['targetLevel'],
        });

        const taskIds = tasks.map(task => task.id);

        const initiatives = await this.em.find(Initiative, {
            rns: { $in: taskIds },
            status: { $nin: excludeStatuses },
        });

        const tasksPrompt = tasks.map(task => `
        priorityNumber: ${task.priorityNumber}
        readinessType: ${task.readinessType}
        targetLevel: ${task.targetLevel.level}
        description: ${task.description}
        taskType: ${RnsStatus[task.status]}
        `).join('\n\n');

        const initiativesPrompt = initiatives.map(initiative => `
        initiativeNumber: ${initiative.initiativeNumber}
        description: ${initiative.description}
        measures: ${initiative.measures}
        targets: ${initiative.targets}
        remarks: ${initiative.remarks}
        `).join('\n\n');


        const prompt = `
        ${basePrompt}

        Based on these tasks:
        ${tasksPrompt}

        Based on these initiatives:
        ${initiativesPrompt}

        Task: If roadblock exists for the startup's personalized tasks and initiatives, create me at least ${dto.no_of_roadblocks_to_create} roadblocks. Approximate a risk number between 1 to 5, where 1 means least risk and 5 means highest risk. Else return an empty list.
        Requirement: The response should be in a JSON format.
        It should consist of description, fix, and riskNumber which should be an integer from 1 to 5.
        JSON format: [{"description": "", "fix": "", "riskNumber": (number)}]
        Requirement note:
        - description and fix have 500 max length
        - return an empty list if no roadblock exists.
        `;
        
        if(dto.debug){
            return prompt;
        }

        const resultData = await this.aiService.generateRoadblocksFromPrompt(prompt); // your JSON parser helper

        // if(dto.debug){
        //     return resultData;
        // }

        const roadblocks:Roadblock[] = [];
        for (const data of resultData) {
            const roadblock = new Roadblock();
            roadblock.startup = startup;
            roadblock.assignee = startup.user
            roadblock.isAiGenerated = true;
            roadblock.status = 1;
            roadblock.riskNumber = Number(data.riskNumber);
            roadblock.description = data.description;
            roadblock.fix = data.fix;

            await this.em.persistAndFlush(roadblock);
        }

        return roadblocks;
        
    }

}
