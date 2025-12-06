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
import {
  AssessmentAnswerType,
  AssessmentStatus,
} from '../entities/enums/assessment-util.enum';
import { AssessmentType } from '../entities/enums/assessment-type.enum';

@Injectable()
export class AssessmentService {
  constructor(private readonly em: EntityManager) {}

  // Admin: Types
  listTypes(): Array<{ name: string }> {
    return Object.values(AssessmentType).map((type) => ({ name: type }));
  }

  async getAllAssessments(): Promise<
    Record<
      string,
      Array<{ id: number; description: string; answerType: string }>
    >
  > {
    const allAssessments = await this.em.find(Assessment, {});

    const grouped: Record<
      string,
      Array<{ id: number; description: string; answerType: string }>
    > = {};

    Object.values(AssessmentType).forEach((type) => {
      grouped[type] = [];
    });

    allAssessments.forEach((assessment) => {
      grouped[assessment.assessmentType].push({
        id: assessment.id,
        description: assessment.description,
        answerType: AssessmentAnswerType[assessment.answerType],
      });
    });

    return grouped;
  }

  // Admin: Fields
  async listFields(
    typeName: string,
  ): Promise<Array<{ id: number; label: string; fieldType: number }>> {
    if (!Object.values(AssessmentType).includes(typeName as AssessmentType)) {
      throw new BadRequestException('Invalid assessment type');
    }

    const fields = await this.em.find(Assessment, {
      assessmentType: typeName as AssessmentType,
    });

    return fields.map((f) => ({
      id: f.id,
      label: f.description,
      fieldType: f.answerType as unknown as number,
    }));
  }

  async createField(
    typeName: string,
    label: string,
    fieldType: number,
  ): Promise<{ id: number }> {
    if (!Object.values(AssessmentType).includes(typeName as AssessmentType)) {
      throw new BadRequestException('Invalid assessment type');
    }

    const f = this.em.create(Assessment, {
      assessmentType: typeName as AssessmentType,
      description: label,
      answerType: fieldType as unknown as AssessmentAnswerType,
    });

    await this.em.persistAndFlush(f);
    return { id: f.id };
  }

  async updateField(
    fieldId: number,
    label?: string,
    fieldType?: number,
  ): Promise<void> {
    const f = await this.em.findOne(Assessment, { id: fieldId });
    if (!f) throw new NotFoundException('Field not found');
    if (typeof label === 'string') f.description = label;
    if (typeof fieldType === 'number')
      f.answerType = fieldType as unknown as AssessmentAnswerType;
    await this.em.persistAndFlush(f);
  }

  async deleteField(fieldId: number): Promise<void> {
    const f = await this.em.findOne(Assessment, { id: fieldId });
    if (!f) throw new NotFoundException('Field not found');
    await this.em.removeAndFlush(f);
  }

  async getStartupAssessments(startupId: number): Promise<AssessmentDto[]> {
    const startupAssessments = await this.em.find(StartupAssessment, {
      id: startupId,
    });

    const groupedAssessments = new Map<string, AssessmentDto>();

    for (const sa of startupAssessments) {
      const assessmentFields = await this.em.find(Assessment, {
        assessmentType: sa.assessmentType,
      });

      const responses = await this.em.find(StartupResponse, {
        startupId,
        assessment: {
          id: {
            $in: assessmentFields.map((af) => af.id),
          },
        },
      });

      const fields: AssessmentFieldDto[] = assessmentFields.map((field) => {
        const response = responses.find((r) => r.assessment.id === field.id);

        return {
          id: field.id.toString(),
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

      groupedAssessments.set(sa.assessmentType, {
        name: sa.assessmentType,
        assessmentStatus: AssessmentStatus[sa.status],
        assessmentFields: fields,
      });
    }

    return Array.from(groupedAssessments.values());
  }

  async submitAssessment(submitDto: SubmitAssessmentDto): Promise<void> {
    const em = this.em.fork();

    try {
      // Validate the assessment type is valid
      if (
        !Object.values(AssessmentType).includes(
          submitDto.assessmentName as AssessmentType,
        )
      ) {
        throw new BadRequestException(
          `Assessment type "${submitDto.assessmentName}" is not valid`,
        );
      }

      const assessmentType = submitDto.assessmentName as AssessmentType;

      const startupAssessment = await em.findOne(StartupAssessment, {
        id: submitDto.startupId,
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
          (a) => a.id.toString() === response.assessmentId,
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
    assessmentTypeName: string,
  ): Promise<void> {
    const em = this.em.fork();

    try {
      // Validate the assessment type is valid
      if (
        !Object.values(AssessmentType).includes(
          assessmentTypeName as AssessmentType,
        )
      ) {
        throw new BadRequestException('Invalid assessment type');
      }

      const startupAssessment = await em.findOne(StartupAssessment, {
        id: startupId,
        assessmentType: assessmentTypeName as AssessmentType,
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
    assessmentTypeName: string,
  ): Promise<void> {
    const em = this.em.fork();

    try {
      // Validate the assessment type is valid
      if (
        !Object.values(AssessmentType).includes(
          assessmentTypeName as AssessmentType,
        )
      ) {
        throw new BadRequestException('Invalid assessment type');
      }

      const startupAssessment = await em.findOne(StartupAssessment, {
        id: startupId,
        assessmentType: assessmentTypeName as AssessmentType,
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

  async createStartupAssessments(
    startupId: number,
    assessmentTypes: AssessmentType[],
  ): Promise<{ ids: number[] }> {
    if (!Array.isArray(assessmentTypes) || assessmentTypes.length === 0) {
      throw new BadRequestException(
        'assessmentTypes must be a non-empty array',
      );
    }

    const ids: number[] = [];

    for (const assessmentType of assessmentTypes) {
      // Validate each type
      if (!Object.values(AssessmentType).includes(assessmentType)) {
        console.warn(`Invalid assessment type: ${assessmentType}, skipping`);
        continue;
      }

      // Check if already exists
      const existing = await this.em.findOne(StartupAssessment, {
        id: startupId,
        assessmentType: assessmentType,
      });

      if (existing) {
        ids.push(existing.id);
        continue; // skip duplicates
      }

      // Create new StartupAssessment
      const sa = this.em.create(StartupAssessment, {
        startup: startupId,
        assessmentType: assessmentType,
        status: AssessmentStatus.Pending,
      });

      await this.em.persistAndFlush(sa);
      ids.push(sa.id);
    }

    return { ids };
  }
}
