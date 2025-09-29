import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AssessmentDto, AssessmentFieldDto } from './dto/assessment.dto';
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
}