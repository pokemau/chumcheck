import { Controller, Get, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('startup/:startupId')
  async getStartupAssessments(
    @Param('startupId') startupId: number
  ): Promise<AssessmentDto[]> {
    return this.assessmentService.getStartupAssessments(startupId);
  }
}