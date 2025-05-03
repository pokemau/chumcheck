import {
  BadRequestException,
  Body,
  Controller,
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
import { StartupApplicationDto } from './dto';
import { StartupService } from './startup.service';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

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
    //@UploadedFile() file: Express.Multer.File,
  ) {
    return await this.startupService.createStartup(dto);
  }

  @Post('/capsule-proposal')
  async getCapsuleProposal() {
    try {
      const dbuffer = await readFile('/home/mau/Downloads/a.pdf');

      const data = await PdfParse(dbuffer);
      let res = await this.aiService.getCapsuleProposalInfo(data.text);

      if (res) {
        // remove trailing ````
        res = res.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        return JSON.parse(res);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Get(':startupId')
  async getStartupById(@Param('startupId') startupId: string) {
    const id = Number(startupId);
    if (isNaN(id)) throw new BadRequestException('Invalid Startup ID');
    return await this.startupService.getStartupById(id);
  }

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
}
