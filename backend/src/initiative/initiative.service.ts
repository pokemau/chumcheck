import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Initiative } from 'src/entities/initiative.entity';
import { CreateInitiativeDto, GenerateInitiativeDto, UpdateInitiativeDto } from './dto/initiative.dto';
import { Rns } from 'src/entities/rns.entity';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';
import { AiService } from 'src/ai/ai.service';
import { createBasePrompt } from 'src/ai/utils/prompt.utils';
import { RnsStatus } from 'src/entities/enums/rns.enum';
import { InitiativeChatHistory } from 'src/entities/initiative-chat-history.entity';

@Injectable()
export class InitiativeService {
    constructor(private readonly em: EntityManager, private readonly aiService: AiService) {}

    //find one ra guro ni dapat?
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

    async generateInitiatives(dto: GenerateInitiativeDto) {
    const task = await this.em.findOneOrFail(Rns, { id: dto.task_id },
       { populate: ['startup', 'startup.capsuleProposal', 'readinessType', 'status', 'targetLevel'],}
    );
    
    const basePrompt = await createBasePrompt(task.startup, this.em);
    
    if (!basePrompt) throw new BadRequestException('No capsule proposal found');

    const taskPrompt = `
    priorityNumber: ${task.priorityNumber}
    readinessType: ${task.readinessType}
    targetLevel: ${task.targetLevel.level}
    description: ${task.description}
    taskType: ${RnsStatus[task.status]}
    `;

    const prompt = `
    ${basePrompt}

    Based on this task:
    ${taskPrompt}

    Task: Create me ${dto.no_of_initiatives_to_create} initiatives for the startup's personalized task.
    Requirement: The response should be in a JSON format.
    It should consist of description, measures, targets, remarks
    JSON format: [{"description": "", "measures": "", "targets": "", "remarks":""}]
    Requirement note:
    - description max 400
    - measures, targets, and remarks max 150
    `;

    const resultText = await this.aiService.generateInitiativesFromPrompt(prompt);



    const initiatives:Initiative[] = [];

    for (const entry of resultText) {
        const initiative = new Initiative();
        initiative.description = entry.description;
        initiative.measures = entry.measures;
        initiative.targets = entry.targets;
        initiative.remarks = entry.remarks;
        initiative.rns = task;
        initiative.isAiGenerated = true;
        initiative.startup = task.startup;
        initiative.assignee = task.startup.user;
        initiative.status = 1;
        initiative.initiativeNumber = 1; 

        await this.em.persistAndFlush(initiative);
    }

    
    if (dto.debug) {
        return  prompt ;
        }else{
            return initiatives;
        }
    }

    async refineInitiative(
        initiativeId: number,
        chatHistory: { role: 'User' | 'Ai'; content: string }[],
        latestPrompt: string
    ): Promise<{ 
        refinedDescription?: string; 
        refinedMeasures?: string;
        refinedTargets?: string;
        refinedRemarks?: string;
        aiCommentary: string 
    }> {
        const initiative = await this.em.findOne(Initiative, { id: initiativeId }, { 
            populate: ['startup', 'startup.capsuleProposal', 'rns'] 
        });
        if (!initiative) throw new NotFoundException('Initiative not found');

        const startup = initiative.startup;
        const capsuleProposalInfo = startup.capsuleProposal;
        if (!capsuleProposalInfo) throw new BadRequestException('No capsule proposal found for this startup.');

        const basePrompt = await createBasePrompt(startup, this.em);

        let prompt = `${basePrompt}

        Current Initiative Details:
        Description: ${initiative.description}
        Measures: ${initiative.measures}
        Targets: ${initiative.targets}
        Remarks: ${initiative.remarks}
        
        Related RNS Task:
        ${initiative.rns.description}

        Chat History:
        ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

        User: ${latestPrompt}

        IMPORTANT INSTRUCTIONS:
        1. Only refine the specific fields that the user explicitly asks to modify
        2. Do not modify any other fields
        3. Respond with a JSON object containing ONLY the requested refinements
        4. Use the exact field names shown in the example

        Example response format:
        If user asks to update measures only:
        {
            "refinedMeasures": "your refined measures here"
        }
        =========
        Your commentary about the changes here.

        If user asks to update description and targets:
        {
            "refinedDescription": "your refined description here",
            "refinedTargets": "your refined targets here"
        }
        =========
        Your commentary about the changes here.

        Available fields:
        - refinedDescription (for description updates)
        - refinedMeasures (for measures updates)
        - refinedTargets (for targets updates)
        - refinedRemarks (for remarks updates)

        Remember:
        - Only include fields that the user specifically asks to refine
        - The JSON must be valid and properly formatted
        - Always include the ========= separator followed by your commentary`;

        const result = await this.aiService.refineInitiative(prompt);

        // Save chat history
        const newMessages = [
            new InitiativeChatHistory({
                initiative,
                role: 'User',
                content: latestPrompt
            }),
            new InitiativeChatHistory({
                initiative,
                role: 'Ai',
                content: result.aiCommentary,
                refinedDescription: result.refinedDescription,
                refinedMeasures: result.refinedMeasures,
                refinedTargets: result.refinedTargets,
                refinedRemarks: result.refinedRemarks
            })
        ];

        await this.em.persistAndFlush(newMessages);

        return result;
    }
}
