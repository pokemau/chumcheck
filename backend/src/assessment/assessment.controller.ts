import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  // Admin: Types
  @Get('types')
  listTypes() {
    return this.assessmentService.listTypes();
  }

  @Get()
  async getAllAssessments() {
    return this.assessmentService.getAllAssessments();
  }

  // Admin: Fields
  @Get('types/:typeName/fields')
  async listFields(@Param('typeName') typeName: string) {
    return this.assessmentService.listFields(typeName);
  }

  @Post('fields')
  async createField(
    @Body() body: { typeName: string; label: string; fieldType: number },
  ) {
    return this.assessmentService.createField(
      body.typeName,
      body.label,
      body.fieldType,
    );
  }

  @Patch('fields/:id')
  async updateField(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { label?: string; fieldType?: number },
  ) {
    await this.assessmentService.updateField(id, body.label, body.fieldType);
    return { ok: true };
  }

  @Delete('fields/:id')
  async deleteField(@Param('id', ParseIntPipe) id: number) {
    await this.assessmentService.deleteField(id);
    return { ok: true };
  }

  @Post('startup-assessment')
  async createStartupAssessment(
    @Body() body: { startupId: number; assessmentTypes: string[] },
  ) {
    return this.assessmentService.createStartupAssessments(
      body.startupId,
      body.assessmentTypes as any,
    );
  }

  // Existing startup assessment endpoints
  @Get('startup/:startupId')
  async getStartupAssessments(
    @Param('startupId', ParseIntPipe) startupId: number,
  ): Promise<AssessmentDto[]> {
    return this.assessmentService.getStartupAssessments(startupId);
  }

  @Post('submit')
  async submitAssessment(
    @Body() submitDto: SubmitAssessmentDto,
  ): Promise<void> {
    await this.assessmentService.submitAssessment(submitDto);
  }

  @Patch('startup/:startupId/assessment/:assessmentType/complete')
  async markAssessmentComplete(
    @Param('startupId', ParseIntPipe) startupId: number,
    @Param('assessmentType') assessmentType: string,
  ): Promise<void> {
    await this.assessmentService.markAssessmentComplete(
      startupId,
      assessmentType,
    );
  }

  @Patch('startup/:startupId/assessment/:assessmentType/pending')
  async markAssessmentPending(
    @Param('startupId', ParseIntPipe) startupId: number,
    @Param('assessmentType') assessmentType: string,
  ): Promise<void> {
    await this.assessmentService.markAssessmentPending(
      startupId,
      assessmentType,
    );
  }
}
