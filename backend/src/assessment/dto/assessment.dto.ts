import {
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitAnswerDto {
  @IsString()
  assessmentId: string;

  @IsString()
  answerValue: string; // Changed from 'answer' to match frontend payload
}

export class SubmitAssessmentDto {
  @IsNumber()
  startupId: number;

  @IsString()
  assessmentName: string;

  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  responses: SubmitAnswerDto[];
}

export interface AssessmentFieldDto {
  id: string;
  description: string;
  type: string;
  answer?: string;
  fileUrl?: string;
}

export interface AssessmentDto {
  name: string;
  assessmentStatus: string;
  assessmentFields: AssessmentFieldDto[];
}