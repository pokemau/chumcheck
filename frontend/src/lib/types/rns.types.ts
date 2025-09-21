export interface RNSItem {
  id: number;
  priorityNumber: number;
  description: string;
  isAiGenerated: boolean;
  status: number;
  requestedStatus: number;
  approvalStatus: string;
  assignee?: { id: number };
  readinessType?: string;
  targetLevel?: number;
  targetLevelScore?: number;
  term?: number;
}
