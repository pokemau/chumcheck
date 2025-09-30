import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AssessmentDto, AssessmentFieldDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';
import { StartupAssessment } from '../entities/startup-assessment.entity';
import { Assessment } from '../entities/assessment.entity';
import { StartupResponse } from '../entities/startup-response.entity';
import { AssessmentAnswerType, AssessmentType, AssessmentStatus } from '../entities/enums/assessment-util.enum';

@Injectable()
export class AssessmentService {
  constructor(private readonly em: EntityManager) {}

  async getStartupAssessments(startupId: number): Promise<AssessmentDto[]> {
    // 1. Get all startup assessments for this startup
    const startupAssessments = await this.em.find(StartupAssessment, { startupId });
    
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
          id: field.fieldKey,
          description: field.description,
          type: AssessmentAnswerType[field.answerType], // Get enum key instead of value
          answer: response?.answerValue || '', // Always include answer, empty string if no response
        };

        // Add fileUrl only for File type responses that have a value
        if (field.answerType === AssessmentAnswerType.File && response?.answerValue) {
          return {
            ...baseField,
            fileUrl: response.answerValue
          };
        }

        return baseField;
      });

      // Add to grouped result
      groupedAssessments.set(AssessmentType[sa.assessmentType], {
        name: AssessmentType[sa.assessmentType], // Get enum key instead of value
        assessmentStatus: AssessmentStatus[sa.status], // Get enum key instead of value
        assessmentFields: fields,
      });
    }

    return Array.from(groupedAssessments.values());
  }

  async submitAssessment(submitDto: SubmitAssessmentDto): Promise<void> {
    const em = this.em.fork();

    try {
      const assessmentType = AssessmentType[submitDto.assessmentType as keyof typeof AssessmentType];
      if (assessmentType === undefined) {
        throw new BadRequestException('Invalid assessment type');
      }
      // 1. Get startup assessment
      const startupAssessment = await em.findOne(StartupAssessment, {
        startupId: submitDto.startupId,
        assessmentType: assessmentType,
      });

      if (!startupAssessment) {
        throw new BadRequestException('Assessment not found for startup');
      }

      // 2. Get all required assessments for this type
      const requiredAssessments = await em.find(Assessment, {
        assessmentType: assessmentType,
      });

      // 3. Save submitted answers
      for (const answer of submitDto.answers) {
        const assessment = requiredAssessments.find(a => a.fieldKey === answer.assessmentId);
        if (!assessment) continue;

        const existingResponse = await em.findOne(StartupResponse, {
          startupId: submitDto.startupId,
          assessment: assessment,
        });

        if (existingResponse) {
          existingResponse.answerValue = answer.answer;
          await em.persist(existingResponse);
        } else {
          const newResponse = em.create(StartupResponse, {
            startupId: submitDto.startupId,
            assessment: assessment,
            answerValue: answer.answer,
          });
          await em.persist(newResponse);
        }
      }

      // 4. Check if all required assessments are answered
      const allResponses = await em.find(StartupResponse, {
        startupId: submitDto.startupId,
        assessment: { $in: requiredAssessments },
      });

      const isComplete = requiredAssessments.every(required => 
        allResponses.some(response => 
          response.assessment.assessment_id === required.assessment_id && 
          response.answerValue?.trim()
        )
      );

      // 5. Update status if all assessments are completed
      if (isComplete) {
        startupAssessment.status = AssessmentStatus.Completed;
        await em.persist(startupAssessment);
      }

      await em.flush();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }
}