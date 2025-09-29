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