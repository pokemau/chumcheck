export type AssessmentField = {
  id: string;
  description: string;
  type: 'File' | 'ShortAnswer' | 'LongAnswer';
  answer?: string;
  fileUrl?: string;
  fileName?: string;
};

export type Assessment = {
  name: string;
  assessmentStatus: 'Pending' | 'Completed';
  assessmentFields: AssessmentField[];
};