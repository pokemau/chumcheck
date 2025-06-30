export type User = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: Role;
};

export type Startup = {
  calculatorQuestionAnswers: CalculatorQuestionAnswer[];
  capsuleProposal: CapsuleProposal;
  dataPrivacy: boolean;
  dateTimeDeleted: Date;
  eligibility: boolean;
  groupName: string;
  id: number;
  links: string;
  members: User[];
  mentors: User[];
  name: string;
  qualificationStatus: QualificationStatus;
  readinessLevels: StartupReadinessLevel[];
  universityName: string;
  uratQuestionAnswers: UratQuestionAnswer;
  user: User;
};

export type CalculatorQuestionAnswer = {
  id: number;
  question: CalculatorQuestion;
  startup: number;
};

export type CalculatorQuestion = {
  id: number;
  category: CalculatorQuestionCategory;
  question: string;
  score: number;
};

export type UratQuestionAnswer = {
  id: number;
  response: string;
  score: number;
  startup: number;
  uratQuestion: UratQuestion;
};

export type UratQuestion = {
  id: number;
  question: string;
  readinessType: ReadinessType;
};

export type CapsuleProposal = {
  description: string;
  fileName: string;
  id: number;
  methodology: string;
  objectives: string;
  problemStatement: string;
  scope: string;
  solutionDescription: string;
  startup: number;
  targetMarket: string;
  title: string;
};

export type StartupReadinessLevel = {
  createdAt: Date;
  id: number;
  readinessLevel: ReadinessLevel;
  remark: string;
  startup: number;
  updatedAt: number;
};

export type ReadinessLevel = {
  id: number;
  level: number;
  name: string;
  readinessType: ReadinessType;
};

export enum ReadinessType {
  Technology = 'Technology',
  Market = 'Market',
  Acceptance = 'Acceptance',
  Organizational = 'Organizational',
  Regulatory = 'Regulatory',
  Investment = 'Investment',
}

export enum QualificationStatus {
  PENDING = 1,
  RATED = 2,
  QUALIFIED = 3,
  REJECTED = 4,
  PAUSED = 5,
  COMPLETED = 6,
}

export enum CalculatorQuestionCategory {
  Technology = 'Technology',
  Product_Development = 'Product Development',
  Product_Definition_Design = 'Product Definition/Design',
  Competitive_Landscape = 'Competitive Landscape',
  Team = 'Team',
  Go_To_Market = 'Go-To-Market',
  Manufacturing_Supply_Chain = 'Manufacturing/Supply Chain',
}

export enum Role {
  Startup = 'Startup',
  Mentor = 'Mentor',
  Manager = 'Manager',
}

