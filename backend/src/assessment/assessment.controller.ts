import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Delete } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  // Admin: Types
  @Get('types')
  async listTypes() {
    return this.assessmentService.listTypes();
  }

  @Post('types')
  async createType(@Body() body: { name: string }) {
    return this.assessmentService.createType(body.name);
  }

  @Patch('types/:id')
  async renameType(@Param('id', ParseIntPipe) id: number, @Body() body: { name: string }) {
    await this.assessmentService.renameType(id, body.name);
    return { ok: true };
  }

  @Delete('types/:id')
  async deleteType(@Param('id', ParseIntPipe) id: number) {
    await this.assessmentService.deleteType(id);
    return { ok: true };
  }

  // Admin: Fields
  @Get('types/:id/fields')
  async listFields(@Param('id', ParseIntPipe) typeId: number) {
    return this.assessmentService.listFields(typeId);
  }

  @Post('fields')
  async createField(@Body() body: { typeId: number; label: string; fieldType: number }) {
    return this.assessmentService.createField(body);
  }

  @Patch('fields/:id')
  async updateField(@Param('id', ParseIntPipe) id: number, @Body() body: { label?: string; fieldType?: number }) {
    await this.assessmentService.updateField(id, body);
    return { ok: true };
  }

  @Delete('fields/:id')
  async deleteField(@Param('id', ParseIntPipe) id: number) {
    await this.assessmentService.deleteField(id);
    return { ok: true };
  }

  @Post('startup-assessment')
  async createStartupAssessment(@Body() body: { startupId: number; assessmentTypeIds: number[] }) {
    return this.assessmentService.createStartupAssessments(body.startupId, body.assessmentTypeIds);
  }

  // Existing startup assessment endpoints
  @Get('startup/:startupId')
  async getStartupAssessments(
    @Param('startupId', ParseIntPipe) startupId: number
  ): Promise<AssessmentDto[]> {
    return this.assessmentService.getStartupAssessments(startupId);
  }

  @Post('submit')
  async submitAssessment(@Body() submitDto: SubmitAssessmentDto): Promise<void> {
    await this.assessmentService.submitAssessment(submitDto);
  }

  @Patch('startup/:startupId/assessment/:assessmentType/complete')
  async markAssessmentComplete(
    @Param('startupId', ParseIntPipe) startupId: number,
    @Param('assessmentType') assessmentType: string
  ): Promise<void> {
    await this.assessmentService.markAssessmentComplete(startupId, assessmentType);
  }

  @Patch('startup/:startupId/assessment/:assessmentType/pending')
  async markAssessmentPending(
    @Param('startupId', ParseIntPipe) startupId: number,
    @Param('assessmentType') assessmentType: string
  ): Promise<void> {
    await this.assessmentService.markAssessmentPending(startupId, assessmentType);
  }
}
