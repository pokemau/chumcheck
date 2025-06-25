import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { StartupRNA } from 'src/entities/rna.entity';
import { Startup } from 'src/entities/startup.entity';
import { CreateStartupRnaDto, GenerateRNAsDto, UpdateStartupRnaDto  } from './dto/rna.dto';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class RnaService {
    constructor(private em: EntityManager, private readonly aiService: AiService) {}
    
    async getRNAbyId(startupId: number) {
      return await this.em.find(StartupRNA, { startup: startupId }, {
        populate: ['readinessLevel']
      });
    }  

    async create(dto: CreateStartupRnaDto) {
      if (!dto.readiness_level_id) {
        throw new BadRequestException('readiness_level_id is required');
      }
    
      const readinessRef = this.em.getReference(ReadinessLevel, dto.readiness_level_id);
      const startupRef = this.em.getReference(Startup, dto.startup_id);
    
      const rna = this.em.create(StartupRNA, {
        rna: dto.rna,
        isAiGenerated: dto.isAiGenerated ?? false,
        startup: startupRef,
        readinessLevel: readinessRef,
      });
    
      await this.em.persistAndFlush(rna);
      return rna;
    }
    

    async update(id: number, dto: UpdateStartupRnaDto) {
      const rna = await this.em.findOneOrFail(StartupRNA, { id });
    
      if (dto.rna !== undefined) {
        rna.rna = dto.rna;
      }

      if (dto.isAiGenerated !== undefined) {
        rna.isAiGenerated = dto.isAiGenerated;
      }

      await this.em.flush();
      return rna;
    }

    async delete(id: number) {
      const rna = await this.em.findOne(StartupRNA, { id });
      if (!rna) throw new NotFoundException(`RNA with ID ${id} not found`);
    
      await this.em.removeAndFlush(rna);
      return rna;
    }

    async generateRNA(id: number) {
      // 1. Validate startup exists
      const startup = await this.em.findOne(Startup, { id: id }, {
        populate:['capsuleProposal']
      });
      if (!startup) throw new NotFoundException('Startup not found');
  
      // 2. Get capsule proposal info
      const capsuleProposalInfo = startup.capsuleProposal;
      if (!capsuleProposalInfo) throw new BadRequestException('No capsule proposal found.');
  
      // Readiness levels for prompt building
      const startupReadinessLevels = await this.em.find(
        StartupReadinessLevel,
        { startup: startup },
        { populate: ['readinessLevel'] },
      );

      console.log(startupReadinessLevels);
  
      const trl = startupReadinessLevels[0]?.readinessLevel.level || 0;
      const mrl = startupReadinessLevels[1]?.readinessLevel.level || 0;
      const arl = startupReadinessLevels[2]?.readinessLevel.level || 0;
      const orl = startupReadinessLevels[3]?.readinessLevel.level || 0;
      const rrl = startupReadinessLevels[4]?.readinessLevel.level || 0;
      const irl = startupReadinessLevels[5]?.readinessLevel.level || 0;
  
      const basePrompt = `
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

      const prompt = `
      ${basePrompt}
      
      TASK: Generate a RNA(Readiness and Needs Assessment) for each readiness level.
      Requirement: The response should be in a JSON format.
      JSON format: {{"readiness_level_type": (string), "rna": ""(string)}}
      Requirement:
      - readiness_level_type consists of Technology, Market, Acceptance, Organizational, Regulatory, and Investment and should only be those with no additional text and in that order
      - details has a max length of 500
      - details should be for that readiness type only.
      `;

      const targetReadinessLevel = {
        "Technology": trl,
        "Market": mrl,
        "Acceptance": arl,
        "Organizational": orl,
        "Regulatory": rrl,
        "Investment": irl,
      }

      const generatedRNAs = await this.aiService.generateRNAsFromPrompt(prompt);
      // const generatedRNAs = [
      //   {
      //       "readiness_level_type": "Technology",
      //       "rna": "Current Technology Readiness Level (TRL) is 1, indicating basic principles are observed and reported. AgriNest needs significant work to move towards a functional prototype. Focus should be on identifying key technologies (sensors, embedded systems, app development framework) and proving their feasibility in a lab environment. A core need is expertise in IoT and AI, potentially through hiring or partnerships. Early-stage funding will be needed for component procurement and initial prototype development. This also includes defining the system architecture for data collection, processing, and presentation within the app. Moving to TRL 2-3 requires demonstrating that the core AgriNest concepts can actually work in controlled conditions."
      //   },
      //   {
      //       "readiness_level_type": "Market",
      //       "rna": "Current Market Readiness Level (MRL) is 4, indicating that the business has identified the market and its specific needs. The next step is to determine whether or not the business has a viable product and go-to-market strategy. This requires market testing and validation to determine whether or not customers want the product at the price. This must be done in parallel with product development to ensure a viable product and plan."
      //   },
      //   {
      //       "readiness_level_type": "Acceptance",
      //       "rna": "Current Acceptance Readiness Level (ARL) is 6, indicating that preliminary marketing work has taken place, and the business has demonstrated a minimal amount of user engagement in the form of likes and shares online. The next step is to get real user feedback to determine whether or not the idea has real-world application. This requires user surveys and testing, which will help the business refine its assumptions. This would validate or invalidate AgriNest's core assumptions around user preferences, pricing sensitivity, and feature priorities, and help optimize the user experience. This is an important step towards widespread user adoption."
      //   },
      //   {
      //       "readiness_level_type": "Organizational",
      //       "rna": "Current Organizational Readiness Level (ORL) is 1, indicating a lack of established processes, team structure, and operational infrastructure. A crucial need is defining roles and responsibilities within the founding team and establishing clear decision-making processes. The team may lack the skills and experiences necessary for the technical and marketing challenges ahead, so the organizational structure should reflect those needs. The startup must establish clear processes for prototyping, marketing, and sales to scale. A key step is to recruit key roles in product design, software development, and marketing. Moving to ORL 2-3 requires building a basic operational framework for managing the acceleration program's activities."
      //   },
      //   {
      //       "readiness_level_type": "Regulatory",
      //       "rna": "Current Regulatory Readiness Level (RRL) is 7, indicating that the business has identified the laws and regulations that pertain to the product. The next step is to ensure that the business has established a legal and regulatory plan. The business needs to identify and address any regulatory requirements related to electrical safety, materials used, and data privacy. The business should have a plan to protect intellectual property, including patent filing for the core technology. The team will need expertise in relevant regulations to avoid delays and legal issues."
      //   },
      //   {
      //       "readiness_level_type": "Investment",
      //       "rna": "Current Investment Readiness Level (IRL) is 9, indicating the team has already secured seed funding, or grants, or is bootstrapping from personal resources. While some resources are available, they may not be enough to meet the goals of mass production, market testing, and market strategy planning. Additional funding is required to refine the product, conduct proper testing, and begin to scale the business. The need is a comprehensive financial plan that outlines the required investment, projected revenue, and key milestones for investors. A pitch deck must be created to attract investors. The company needs to show revenue, profitability, and a scalable business model to move forward."
      //   },
      // ]


      const createdRNAs: StartupRNA[] = [];
      for (let i = 0; i < generatedRNAs.length; i++) {
          const anotherRNA = generatedRNAs[i];
          //   const targetLevel = await this.em.findOne(StartupReadinessLevel, {
          //     readinessType: readinessType,
          //     level: Math.min(Number(task.target_level) || targetReadinessLevel[readinessType]+1, 9),
          // });

          const newRNA = new StartupRNA();
          newRNA.rna = anotherRNA.rna;
          newRNA.isAiGenerated = false;
          newRNA.startup = startup;
          newRNA.readinessLevel = startupReadinessLevels[i]?.readinessLevel;

          await this.em.persist(newRNA);
          createdRNAs.push(newRNA);
      }
      await this.em.flush();
  
      return createdRNAs.map((r: StartupRNA) => ({
          id: r.id,
          rna: r.rna,
          isAiGenerated: r.isAiGenerated,
          startup: r.startup,
          readinessLevel: r.readinessLevel
      }));
      
    }
}
