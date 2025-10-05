import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('startup/:startupId')
  async getStartupAssessments(
    @Param('startupId') startupId: number
  ): Promise<AssessmentDto[]> {
    return this.assessmentService.getStartupAssessments(startupId);
  }

  @Post('submit')
  async submitAssessment(@Body() submitDto: SubmitAssessmentDto): Promise<void> {
    await this.assessmentService.submitAssessment(submitDto);
  }

  @Patch('startup/:startupId/assessment/:assessmentType/complete')
  async markAssessmentComplete(
    @Param('startupId') startupId: number,
    @Param('assessmentType') assessmentType: string
  ): Promise<void> {
    await this.assessmentService.markAssessmentComplete(startupId, assessmentType);
  }

  @Patch('startup/:startupId/assessment/:assessmentType/pending')
  async markAssessmentPending(
    @Param('startupId') startupId: number,
    @Param('assessmentType') assessmentType: string
  ): Promise<void> {
    await this.assessmentService.markAssessmentPending(startupId, assessmentType);
  }
}