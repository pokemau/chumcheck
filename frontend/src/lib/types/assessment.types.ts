export type AssessmentField = {
  id: string;
  description: string;
  type: 'File' | 'ShortAnswer' | 'LongAnswer';
  answer?: string;
  fileUrl?: string;
};

export type Assessment = {
  name: string;
  assessmentStatus: 'Pending' | 'Completed';
  assessmentFields: AssessmentField[];
};