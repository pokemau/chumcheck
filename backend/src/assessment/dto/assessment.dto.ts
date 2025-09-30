import { IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitAnswerDto {
  @IsString()
  assessmentId: string;

  @IsString()
  answer: string;
}

export class SubmitAssessmentDto {
  @IsNumber()
  startupId: number;

  @IsString()
  assessmentType: string;

  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
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