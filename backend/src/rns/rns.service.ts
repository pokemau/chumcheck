import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Rns } from 'src/entities/rns.entity';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { CreateRnsDto, UpdateRnsDto, GenerateTasksDto } from './dto';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';
import { CapsuleProposal } from 'src/entities/capsule-proposal.entity';
import { StartupRNA } from 'src/entities/rna.entity';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum'; // adjust import as needed
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { AiService } from 'src/ai/ai.service';
import { RnsChatHistory } from 'src/entities/rns-chat-history.entity';
import { RnsStatus } from 'src/entities/enums/rns.enum';

@Injectable()
export class RnsService {
  constructor(private em: EntityManager, private readonly aiService: AiService) {}

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

    if (typeof dto.isAiGenerated === 'boolean') {
      rns.isAiGenerated = dto.isAiGenerated;
    }

    await this.em.flush();
    return rns;
  }

  async generateTasks(dto: GenerateTasksDto) {
    // 1. Validate startup exists
    const startup = await this.em.findOne(Startup, { id: dto.startup_id }, {
      populate:['capsuleProposal']
    });
    if (!startup) throw new NotFoundException('Startup not found');

    // 2. Get capsule proposal info
    const capsuleProposalInfo = startup.capsuleProposal;
    if (!capsuleProposalInfo) throw new BadRequestException('No capsule proposal found.');

    // 3. Get readiness type entity
    const readinessType = dto.readinessType;

  //Term/Status
  const term = dto.term <= 6 ? "Short-term" : "Long-term";

    

    // 4. Get startup RNAs for this readiness type
    const startupRnas = await this.em.find(StartupRNA, {
      startup: startup,
      isAiGenerated: false,
      readinessLevel: { readinessType: readinessType },
    }, {
      populate: ['readinessLevel']
    });

    //readiness levels
    const startupReadinessLevels = await this.em.find(
          StartupReadinessLevel,
          {
            startup: startup,
          },
          {
            populate: ['readinessLevel'],
          },
    );

    // 5. Build base prompt (adapted from your Python helper)
    //GET LEVELS
    // const trl = startupReadinessLevels[0].readinessLevel.readinessType;
    // const mrl = startupReadinessLevels[1].readinessLevel.readinessType;
    // const arl = startupReadinessLevels[2].readinessLevel.readinessType;
    // const orl = startupReadinessLevels[3].readinessLevel.readinessType;
    // const rrl = startupReadinessLevels[4].readinessLevel.readinessType;
    // const irl = startupReadinessLevels[5].readinessLevel.readinessType;

    const trl = startupReadinessLevels[0].readinessLevel.level;
    const mrl = startupReadinessLevels[1].readinessLevel.level;
    const arl = startupReadinessLevels[2].readinessLevel.level;
    const orl = startupReadinessLevels[3].readinessLevel.level;
    const rrl = startupReadinessLevels[4].readinessLevel.level;
    const irl = startupReadinessLevels[5].readinessLevel.level;


    let basePrompt = `
    Given these data:
    Acceleration Proposal Title: ${capsuleProposalInfo.title}
    Duration: 3 months
    I. About the startup
    A. Startup Description
    ${capsuleProposalInfo.description}
    B. Problem Statement
    ${capsuleProposalInfo.problemStatement}
    C. Target Market
    ${capsuleProposalInfo.targetMarket}
    D. Solution Description
    ${capsuleProposalInfo.solutionDescription}
    II. About the Proposed Acceleration
    A. Objectives
    ${capsuleProposalInfo.objectives}
    B. Scope of The Proposal
    ${capsuleProposalInfo.scope}
    C. Methodology and Expected Outputs
    ${capsuleProposalInfo.methodology}
    Initial Readiness Level:
    TRL ${trl}
    MRL ${mrl}
    ARL ${arl}
    ORL ${orl}
    RRL ${rrl}
    IRL ${irl}
    `;

        // 6. Add startup RNA prompt
        const rlTypeLabel = readinessType;
        let startupRnaPrompt = `These are the RNA for ${rlTypeLabel} Readiness Type Of Startup:\n`;
        for (const rna of startupRnas) {
          const readinessLevel = rna.readinessLevel;
          startupRnaPrompt += `Readiness Level ${readinessLevel.level}: ${rna.rna}\n`;
        }

        // 7. Compose final prompt
        const prompt = `
    ${basePrompt}

    ${startupRnaPrompt}

    TASK: Create me ${dto.no_of_tasks_to_create} ${term} tasks for the startup's personalized learning path.
    Requirement: The response should be in a JSON format.
    It should consist of readiness level type, target level, description
    JSON format: [{"target_level": (int), "description": ""}]
    Requirement note:
    - target_level is from 1-9
    - make sure that the tasks will increase the level(target_level) of the specified readiness level type from the initial readiness level type
    - target_level should not exceed to 9
    - description has a max length of 500
    `;

    // 8. Call AI API/service
    const aiTasks = await this.aiService.generateTasksFromPrompt(prompt);

    if (!aiTasks || !Array.isArray(aiTasks) || aiTasks.length === 0) {
      throw new BadRequestException('AI did not return any tasks');
    }

    // 9. Save generated tasks as RNS entities
    const createdRns: Rns[] = [];
    for (const task of aiTasks) {
      // Find the target readiness level entity
      const targetLevel = await this.em.findOne(ReadinessLevel, {
        readinessType: readinessType,
        level: Math.min(task.target_level, 9),
      });
      if (!targetLevel) continue;

      const rns = new Rns();
      rns.priorityNumber = 1; // Or set as needed
      rns.description = task.description;
      rns.targetLevel = targetLevel;
      rns.isAiGenerated = true;
      rns.readinessType = readinessType;
      rns.startup = startup;
      
      rns.status = dto.term <= 6 ? 1 : 7; // Default status, adjust as needed
      rns.assignee = startup.user;

      await this.em.persist(rns);
      createdRns.push(rns);
    }
    await this.em.flush();

    if (dto.debug) {
      return { prompt };
    }else{

        // 10. Return created RNS tasks
        return createdRns.map((r: Rns) => ({
          id: r.id,
          priorityNumber: r.priorityNumber,
          description: r.description,
          targetLevelId: r.targetLevel.id,
          isAiGenerated: r.isAiGenerated,
          status: r.status,
          readinessType: r.readinessType,
          startup: r.startup.id,
        }));
      }
  }

  async refineRnsDescription(
    rnsId: number, 
    chatHistory: { role: 'User' | 'Ai'; content: string; refinedDescription: string | null }[], 
    latestPrompt: string
  ): Promise<{ refinedDescription: string; aiCommentary: string }> {
    const rns = await this.em.findOne(Rns, { id: rnsId }, { populate: ['startup', 'targetLevel', 'startup.capsuleProposal'] });
    if (!rns) throw new NotFoundException('RNS not found');
    const startup = rns.startup;
    const capsuleProposalInfo = startup.capsuleProposal;
    if (!capsuleProposalInfo) throw new BadRequestException('No capsule proposal found for this startup.');

    const startupReadinessLevels = await this.em.find(
      StartupReadinessLevel,
      { startup: startup },
      { populate: ['readinessLevel'] }
    );
    const trl = startupReadinessLevels[0]?.readinessLevel.level || 0;
    const mrl = startupReadinessLevels[1]?.readinessLevel.level || 0;
    const arl = startupReadinessLevels[2]?.readinessLevel.level || 0;
    const orl = startupReadinessLevels[3]?.readinessLevel.level || 0;
    const rrl = startupReadinessLevels[4]?.readinessLevel.level || 0;
    const irl = startupReadinessLevels[5]?.readinessLevel.level || 0;

    let prompt = `Given these data:
      Acceleration Proposal Title: ${capsuleProposalInfo.title}
      Duration: 3 months
      I. About the startup
      A. Startup Description
      ${capsuleProposalInfo.description}
      B. Problem Statement
      ${capsuleProposalInfo.problemStatement}
      C. Target Market
      ${capsuleProposalInfo.targetMarket}
      D. Solution Description
      ${capsuleProposalInfo.solutionDescription}
      II. About the Proposed Acceleration
      A. Objectives
      ${capsuleProposalInfo.objectives}
      B. Scope of The Proposal
      ${capsuleProposalInfo.scope}
      C. Methodology and Expected Outputs
      ${capsuleProposalInfo.methodology}
      Initial Readiness Level:
      TRL ${trl}
      MRL ${mrl}
      ARL ${arl}
      ORL ${orl}
      RRL ${rrl}
      IRL ${irl}

      Here is the current RNS task description: "${rns.description}"

      Given these chat history of user:\n`;

    for (const msg of chatHistory) {
      prompt += `${msg.role}: ${msg.refinedDescription ? `Refined Description: ${msg.refinedDescription}\n` : ''} ${msg.content}\n`;
    }

    prompt += `
      User: ${latestPrompt}\n
      Please rewrite or refine the RNS description according to the user's instructions. Just write the refined description, no other text.

      After you rewrite/refine the RNS description, write '=========' on a new line, then provide a brief AI commentary (1-2 sentences) explaining the changes or improvements you made. Example:\n<refined description>\n=========\n<ai commentary>
    `;

    const result = await this.aiService.refineRnsDescription(prompt);

    const newMessages = [
      new RnsChatHistory({
        rns,
        role: 'User',
        content: latestPrompt
      }),
      new RnsChatHistory({
        rns,
        role: 'Ai',
        content: result.aiCommentary,
        refinedDescription: result.refinedDescription
      })
    ];

    await this.em.persistAndFlush(newMessages);

    return result;
  }

  async getRnsChatHistory(rnsId: number) {
    const chatHistory = await this.em.find(
      RnsChatHistory,
      { rns: { id: rnsId } },
      { orderBy: { createdAt: 'ASC' } }
    );

    return chatHistory;
  }
}
