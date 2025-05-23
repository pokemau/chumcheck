import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { readFile } from 'fs/promises';

import * as PdfParse from 'pdf-parse';
import { AiService } from 'src/ai/ai.service';
import { AddStartupMemberDto, StartupApplicationDto } from './dto';
import { CreateCapsuleProposalDto } from './dto/create-capsule-proposal.dto';
import { StartupService } from './startup.service';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadedFile } from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('startups')
export class StartupController {
  constructor(
    private startupService: StartupService,
    private aiService: AiService,
  ) {}

  @Get('/startups')
  getStartups(@Req() req: any) {
    return this.startupService.getStartups(req.user.id);
  }

  @Get('/criterion-answers')
  async getReadinessLevelCriterionAnswers(
    @Query('startupId', ParseIntPipe) startupId: number,
  ) {
    return this.startupService.getReadinessLevelCriterionAnswers(startupId);
  }

  @Get('/startup-readiness-level')
  async getStartupReadinessLevel(
    @Query('startupId', ParseIntPipe) startupId: number,
  ) {
    return this.startupService.getStartupReadinessLevel(startupId);
  }

  @Get('/ranking-by-urat')
  async getStartupsByUrat() {
    return await this.startupService.getPendingStartupsRankingByUrat();
  }

  @Get('/ranking-by-rubrics')
  async getStartupsByRubrics() {
    return await this.startupService.getQualifiedStartupsRankingByRubrics();
  }

  @Post('/create-startup')
  @UseInterceptors(FileInterceptor('capsuleProposal'))
  async createStartup(
    @Body() dto: StartupApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // If a capsule proposal file is uploaded, parse and create CapsuleProposal
    if (file) {
      try {
        console.log('Capsule proposal file received:', file.originalname);
        const data = await PdfParse(file.buffer);
        let res = await this.aiService.getCapsuleProposalInfo(data.text);
        console.log('AI service result:', res);
        if (res) {
          res = res.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          const parsed = JSON.parse(res);
          console.log('Parsed capsule proposal:', parsed);
          
          const capsuleProposalDto: CreateCapsuleProposalDto = {
            title: dto.name,
            description: parsed.startup_description,
            problemStatement: parsed.problem_statement,
            targetMarket: parsed.target_market,
            solutionDescription: parsed.solution_description,
            objectives: parsed.objectives,
            scope: parsed.scope,
            methodology: parsed.methodology,
            startupId: -1,  //placeholder
          };
          const startup = await this.startupService.createStartup(dto);
          capsuleProposalDto.startupId = startup.id;
          await this.startupService.createCapsuleProposal(capsuleProposalDto);
          console.log('CapsuleProposal created successfully');
          return startup;
        } else {
          console.log('AI service did not return a result');
          throw new BadRequestException('AI service did not return a result')
        }
      } catch (error) {
        console.error('Failed to parse and create capsule proposal:', error);
        throw new BadRequestException('Failed to parse and create capsule proposal: ' + error.message);
      }
    } else {
      console.log('No capsule proposal file uploaded');
      throw new BadRequestException('No capsule proposal file uploaded');
    }
  }

  @Post('add-member')
  async addMemberToStartup(@Body() dto: AddStartupMemberDto) {
    return await this.startupService.addMemberToStartup(dto);
  }

  @Delete('remove-member/:userId')
  async removeMemberFromStartup(
    @Param('userId') userId: number,
    @Body('startupId', ParseIntPipe) startupId: number,
  ) {
    return await this.startupService.removeMemberFromStartup(userId, startupId);
  }

  @Post('/parse-capsule-proposal')
  @UseInterceptors(FileInterceptor('capsuleProposal'))
  async getCapsuleProposal(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const data = await PdfParse(file.buffer);
      let res = await this.aiService.getCapsuleProposalInfo(data.text);

      if (res) {
        res = res.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        return JSON.parse(res);
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to process PDF');
    }
  }

  @Get(':startupId')
  async getStartupById(@Param('startupId') startupId: string) {
    const id = Number(startupId);
    if (isNaN(id)) throw new BadRequestException('Invalid Startup ID');
    return await this.startupService.getStartupById(id);
  }

  // @Get(':startupId/allow-tasks')
  // async getStartupAllowTasksById(@Param('startupId') startupId: string) {
  //   // IDK para unsa
  //   return true;
  // }

  @Get(':startupId/calculator-final-scores')
  async getCalculatorFinalScores(@Param('startupId') startupId: number) {
    return await this.startupService.getCalculatorFinalScores(startupId);
  }

  @Post(':startupId/rate-applicant')
  async rateApplicant(
    @Param('startupId') startupId: number,
    @Body('scores')
    scores: { readinessType: string; questionId: number; score: number }[],
  ) {
    return this.startupService.rateApplicant(startupId, scores);
  }

  @Post(':startupId/approve-applicant')
  async approveApplicant(@Param('startupId') startupId: number) {
    return await this.startupService.approveApplicant(startupId);
  }

  @Post(':startupId/reject-applicant')
  async rejectApplicant(@Param('startupId') startupId: number) {
    return await this.startupService.rejectApplicant(startupId);
  }

  @Post(':startupId/appoint-mentors')
  async appointMentors(
    @Param('startupId') startupId: number,
    @Body('mentor_ids') mentorIds: number[],
    @Body('cohort_id') cohortId: number,
  ) {
    return await this.startupService.appointMentors(
      startupId,
      mentorIds,
      cohortId,
    );
  }

  @Get(':startupId/allow-rnas')
  async allowRNAs(@Param('startupId') startupId: number): Promise<boolean> {
    return this.startupService.allowRNAs(startupId);
  }

  @Get(':startupId/allow-tasks')
  async allowTasks(
    @Param('startupId', ParseIntPipe) startupId: number
  ): Promise<boolean> {
    return this.startupService.allowTasks(startupId);
  }

  @Get(':startupId/allow-initiatives')
  async allowInitiatives(
    @Param('startupId', ParseIntPipe) startupId: number
  ): Promise<boolean> {
    return this.startupService.allowInitiatives(startupId);
  }

  @Get(':startupId/allow-roadblocks')
  async allowRoadblocks(
    @Param('startupId', ParseIntPipe) startupId: number
  ): Promise<boolean> {
    return this.startupService.allowRoadblocks(startupId);
  }
}
