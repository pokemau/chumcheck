import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AssessmentDto, AssessmentFieldDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';
import { StartupAssessment } from '../entities/startup-assessment.entity';
import { Assessment } from '../entities/assessment.entity';
import { StartupResponse } from '../entities/startup-response.entity';
import { AssessmentType } from '../entities/assessment-type.entity';
import { AssessmentAnswerType, AssessmentStatus } from '../entities/enums/assessment-util.enum';

@Injectable()
export class AssessmentService {
  constructor(private readonly em: EntityManager) {}

  async getStartupAssessments(startupId: number): Promise<AssessmentDto[]> {
    // 1. Get all startup assessments for this startup with assessment type populated
    const startupAssessments = await this.em.find(StartupAssessment, 
      { startupId }, 
      { populate: ['assessmentType'] }
    );
    
    // 2. Group by assessment type and create final structure
    const groupedAssessments = new Map<string, AssessmentDto>();

    for (const sa of startupAssessments) {
      // Get all assessment fields for this assessment type
      const assessmentFields = await this.em.find(Assessment, {
        assessmentType: sa.assessmentType,
      });

      // Get all responses for this startup's assessment fields
      const responses = await this.em.find(StartupResponse, {
        startupId,
        assessment: { assessment_id: { $in: assessmentFields.map(af => af.assessment_id) } },
      });

      // Create assessment fields with answers
      const fields: AssessmentFieldDto[] = assessmentFields.map(field => {
        const response = responses.find(r => r.assessment.assessment_id === field.assessment_id);
        
        const baseField = {
          id: field.assessment_id.toString(),
          description: field.description,
          type: AssessmentAnswerType[field.answerType],
          answer: response?.answerValue || '',
        };

        // Add fileUrl and fileName only for File type responses that have a value
        if (field.answerType === AssessmentAnswerType.File && response?.answerValue) {
          return {
            ...baseField,
            fileUrl: response.answerValue,
            fileName: response.fileName || undefined
          };
        }

        return baseField;
      });

      // Add to grouped result using the assessment type from the table
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
      // 1. Find the assessment type by name
      const assessmentType = await em.findOne(AssessmentType, {
        type: submitDto.assessmentType
      });

      if (!assessmentType) {
        throw new BadRequestException('Invalid assessment type');
      }

      // 2. Get startup assessment
      const startupAssessment = await em.findOne(StartupAssessment, {
        startupId: submitDto.startupId,
        assessmentType: assessmentType,
      });

      if (!startupAssessment) {
        throw new BadRequestException('Assessment not found for startup');
      }

      // 3. Get all required assessments for this type
      const requiredAssessments = await em.find(Assessment, {
        assessmentType: assessmentType,
      });

      // 4. Save submitted answers
      for (const answer of submitDto.answers) {
        const assessment = requiredAssessments.find(a => a.assessment_id.toString() === answer.assessmentId);
        if (!assessment) continue;

        const existingResponse = await em.findOne(StartupResponse, {
          startupId: submitDto.startupId,
          assessment: assessment,
        });

        if (existingResponse) {
          existingResponse.answerValue = answer.answer;
          // Only update fileName if it's provided
          if (answer.fileName !== undefined) {
            existingResponse.fileName = answer.fileName;
          }
          await em.persist(existingResponse);
        } else {
          const newResponse = em.create(StartupResponse, {
            startupId: submitDto.startupId,
            assessment: assessment,
            answerValue: answer.answer,
            // Only set fileName if it's provided
            ...(answer.fileName !== undefined && { fileName: answer.fileName })
          });
          await em.persist(newResponse);
        }
      }

      await em.flush();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }

  async markAssessmentComplete(startupId: number, assessmentType: string): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentTypeEntity = await em.findOne(AssessmentType, {
        type: assessmentType
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
      await em.persist(startupAssessment);
      await em.flush();
    } catch (error) {
      console.error('Error marking assessment as complete:', error);
      throw error;
    }
  }

  async markAssessmentPending(startupId: number, assessmentType: string): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentTypeEntity = await em.findOne(AssessmentType, {
        type: assessmentType
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
      await em.persist(startupAssessment);
      await em.flush();
    } catch (error) {
      console.error('Error marking assessment as pending:', error);
      throw error;
    }
  }
}