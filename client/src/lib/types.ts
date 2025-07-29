import { CalculatorQuestionCategory, QualificationStatus, ReadinessType, Role, TaskStatus } from "./enums"

export type User = {
  email: string
  firstName: string
  id: number
  lastName: string
  role: Role
}

export type Startup = {
  calculatorQuestionAnswers: CalculatorQuestionAnswer[]
  capsuleProposal: CapsuleProposal
  dataPrivacy: boolean
  dateTimeDeleted: Date
  eligibility: boolean
  groupName: string
  initiatives: Initiative[]
  id: number
  links: string
  members: User[]
  mentors: User[]
  name: string
  qualificationStatus: QualificationStatus
  readinessLevels: StartupReadinessLevel[]
  universityName: string
  uratQuestionAnswers: UratQuestionAnswer
  user: User
}

export type Initiative = {
  id: number
  priorityNumber: number
  initiativeNumber: number
  clickedByMentor: boolean
  clickedByStartup: boolean
  status: TaskStatus
  requestedStatus: TaskStatus
  approvalStatus: InitiativeApprovalStatus
  rns: number
  isAiGenerated: boolean
  assignee: number
  startup: number
  description: string
  measures: string
  targets: string
  remarks: string
  createdAt: Date
  updatedAt: Date
}

export type CalculatorQuestionAnswer = {
  id: number
  question: CalculatorQuestion
  startup: number
}

export type CalculatorQuestion = {
  id: number
  category: CalculatorQuestionCategory
  question: string
  score: number
}

export type CalculatorQuestionsApiRes = {
  category: CalculatorQuestionCategory
  questions: CalculatorQuestion[]
}

export type UratQuestionAnswer = {
  id: number
  response: string
  score: number
  startup: number
  uratQuestion: UratQuestion
}

export type UratQuestion = {
  id: number
  question: string
  readinessType: ReadinessType
}

export type CapsuleProposal = {
  description: string
  fileName: string
  id: number
  methodology: string
  objectives: string
  problemStatement: string
  scope: string
  solutionDescription: string
  startup: number
  targetMarket: string
  title: string
}

export type StartupReadinessLevel = {
  createdAt: Date
  id: number
  readinessLevel: ReadinessLevel
  remark: string
  startup: number
  updatedAt: number
}

export type ReadinessLevel = {
  id: number
  level: number
  name: string
  readinessType: ReadinessType
}

export type InitiativeApprovalStatus = "Pending" | "Approved" | "Denied" | "Unchanged"

export type RNA = {
  id: number
  isAiGenerated: false
  readinessLevel: ReadinessLevel
  rna: string
  createdAt: Date
  updatedAt: Date
}
