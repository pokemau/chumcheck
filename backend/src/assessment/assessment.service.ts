import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AssessmentDto, AssessmentFieldDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';
import { StartupAssessment } from '../entities/startup-assessment.entity';
import { Assessment } from '../entities/assessment.entity';
import { StartupResponse } from '../entities/startup-response.entity';
import { AssessmentType } from '../entities/assessment-type.entity';
import {
  AssessmentAnswerType,
  AssessmentStatus,
} from '../entities/enums/assessment-util.enum';

@Injectable()
export class AssessmentService {
  constructor(private readonly em: EntityManager) {}

  // Admin: Types
  async listTypes(): Promise<Array<{ id: number; name: string }>> {
    const list = await this.em.find(AssessmentType, {});
    return list.map((t) => ({ id: t.id, name: t.type }));
  }

  async createType(name: string): Promise<{ id: number; name: string }> {
    const existing = await this.em.findOne(AssessmentType, { type: name });
    if (existing) throw new BadRequestException('Type already exists');
    const t = this.em.create(AssessmentType, { type: name });
    await this.em.persistAndFlush(t);
    return { id: t.id, name: t.type };
  }

  async renameType(id: number, name: string): Promise<void> {
    const t = await this.em.findOne(AssessmentType, { id });
    if (!t) throw new NotFoundException('Type not found');
    t.type = name;
    await this.em.persistAndFlush(t);
  }

  async deleteType(id: number): Promise<void> {
    const em = this.em.fork();
    const t = await em.findOne(AssessmentType, { id });
    if (!t) throw new NotFoundException('Type not found');
    // Delete fields first to satisfy FK constraints
    const fields = await em.find(Assessment, { assessmentType: t });
    for (const f of fields) em.remove(f);
    await em.removeAndFlush(t);
  }

  // Admin: Fields
  async listFields(
    typeId: number,
  ): Promise<Array<{ id: number; label: string; fieldType: number }>> {
    const t = await this.em.findOne(AssessmentType, { id: typeId });
    if (!t) throw new NotFoundException('Type not found');
    const fields = await this.em.find(Assessment, { assessmentType: t });
    return fields.map((f) => ({
      id: f.assessment_id,
      label: f.description,
      fieldType: f.answerType as unknown as number,
    }));
  }

  async createField(
    typeId: number,
    label: string,
    fieldType: number,
  ): Promise<{ id: number }> {
    const t = await this.em.findOne(AssessmentType, { id: typeId });
    if (!t) throw new NotFoundException('Type not found');
    const f = this.em.create(Assessment, {
      assessmentType: t,
      description: label,
      answerType: fieldType as unknown as AssessmentAnswerType,
    } as any);
    await this.em.persistAndFlush(f);
    return { id: f.assessment_id };
  }

  async updateField(
    fieldId: number,
    label?: string,
    fieldType?: number,
  ): Promise<void> {
    const f = await this.em.findOne(Assessment, { assessment_id: fieldId });
    if (!f) throw new NotFoundException('Field not found');
    if (typeof label === 'string') f.description = label;
    if (typeof fieldType === 'number')
      f.answerType = fieldType as unknown as AssessmentAnswerType;
    await this.em.persistAndFlush(f);
  }

  async deleteField(fieldId: number): Promise<void> {
    const f = await this.em.findOne(Assessment, { assessment_id: fieldId });
    if (!f) throw new NotFoundException('Field not found');
    await this.em.removeAndFlush(f);
  }

  async getStartupAssessments(startupId: number): Promise<AssessmentDto[]> {
    const startupAssessments = await this.em.find(
      StartupAssessment,
      { startupId },
      { populate: ['assessmentType'] },
    );

    const groupedAssessments = new Map<string, AssessmentDto>();

    for (const sa of startupAssessments) {
      const assessmentFields = await this.em.find(Assessment, {
        assessmentType: sa.assessmentType,
      });

      const responses = await this.em.find(StartupResponse, {
        startupId,
        assessment: {
          assessment_id: {
            $in: assessmentFields.map((af) => af.assessment_id),
          },
        },
      });

      const fields: AssessmentFieldDto[] = assessmentFields.map((field) => {
        const response = responses.find(
          (r) => r.assessment.assessment_id === field.assessment_id,
        );

        return {
          id: field.assessment_id.toString(),
          description: field.description,
          type: AssessmentAnswerType[field.answerType],
          answer: response?.answerValue || '',
          // For File type, answerValue contains the JSON with files array
          ...(field.answerType === AssessmentAnswerType.File &&
            response?.answerValue && {
              fileUrl: response.answerValue,
            }),
        };
      });

      groupedAssessments.set(sa.assessmentType.type, {
        name: sa.assessmentType.type,
        assessmentStatus: AssessmentStatus[sa.status],
        assessmentFields: fields,
      });
    }

    return Array.from(groupedAssessments.values());
  }

  async submitAssessment(submitDto: SubmitAssessmentDto): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentType = await em.findOne(AssessmentType, {
        type: submitDto.assessmentName,
      });

      if (!assessmentType) {
        throw new BadRequestException(
          `Assessment type "${submitDto.assessmentName}" not found`,
        );
      }

      const startupAssessment = await em.findOne(StartupAssessment, {
        startupId: submitDto.startupId,
        assessmentType: assessmentType,
      });

      if (!startupAssessment) {
        throw new BadRequestException(
          'Assessment not assigned to this startup',
        );
      }

      const requiredAssessments = await em.find(Assessment, {
        assessmentType: assessmentType,
      });

      for (const response of submitDto.responses) {
        const assessment = requiredAssessments.find(
          (a) => a.assessment_id.toString() === response.assessmentId,
        );

        if (!assessment) {
          console.warn(
            `Assessment field ${response.assessmentId} not found, skipping`,
          );
          continue;
        }

        const existingResponse = await em.findOne(StartupResponse, {
          startupId: submitDto.startupId,
          assessment: assessment,
        });

        if (existingResponse) {
          existingResponse.answerValue = response.answerValue;
          em.persist(existingResponse);
        } else {
          const newResponse = em.create(StartupResponse, {
            startupId: submitDto.startupId,
            assessment: assessment,
            answerValue: response.answerValue,
          });
          em.persist(newResponse);
        }
      }

      await em.flush();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }

  async markAssessmentComplete(
    startupId: number,
    assessmentType: string,
  ): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentTypeEntity = await em.findOne(AssessmentType, {
        type: assessmentType,
      });

      if (!assessmentTypeEntity) {
        throw new BadRequestException('Invalid assessment type');
      }

      const startupAssessment = await em.findOne(StartupAssessment, {
        startupId,
        assessmentType: assessmentTypeEntity,
      });

      if (!startupAssessment) {
        throw new BadRequestException('Assessment not found for startup');
      }

      startupAssessment.status = AssessmentStatus.Completed;
      em.persist(startupAssessment);
      await em.flush();
    } catch (error) {
      console.error('Error marking assessment as complete:', error);
      throw error;
    }
  }

  async markAssessmentPending(
    startupId: number,
    assessmentType: string,
  ): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentTypeEntity = await em.findOne(AssessmentType, {
        type: assessmentType,
      });

      if (!assessmentTypeEntity) {
        throw new BadRequestException('Invalid assessment type');
      }

      const startupAssessment = await em.findOne(StartupAssessment, {
        startupId,
        assessmentType: assessmentTypeEntity,
      });

      if (!startupAssessment) {
        throw new BadRequestException('Assessment not found for startup');
      }

      startupAssessment.status = AssessmentStatus.Pending;
      em.persist(startupAssessment);
      await em.flush();
    } catch (error) {
      console.error('Error marking assessment as pending:', error);
      throw error;
    }
  }

  // Create StartupAssessment for a startup and multiple assessment types
  async createStartupAssessments(
    startupId: number,
    assessmentTypeIds: number[],
  ): Promise<{ ids: number[] }> {
    if (!Array.isArray(assessmentTypeIds) || assessmentTypeIds.length === 0) {
      throw new BadRequestException(
        'assessmentTypeIds must be a non-empty array',
      );
    }
    const ids: number[] = [];
    for (const assessmentTypeId of assessmentTypeIds) {
      // Check if already exists
      const existing = await this.em.findOne(StartupAssessment, {
        startupId,
        assessmentType: assessmentTypeId,
      });
      if (existing) continue; // skip duplicates

      // Find assessment type
      const assessmentType = await this.em.findOne(AssessmentType, {
        id: assessmentTypeId,
      });
      if (!assessmentType) continue; // skip invalid

      // Create new StartupAssessment
      const sa = this.em.create(StartupAssessment, {
        startupId,
        assessmentType,
        status: AssessmentStatus.Pending,
      });
      await this.em.persistAndFlush(sa);
      ids.push(sa.id);
    }
    return { ids };
  }
}
