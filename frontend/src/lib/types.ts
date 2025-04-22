export type Role = 'Startup' | 'Mentor' | 'Manager' | 'Manager as Mentor';
export type Application = {
  id: string;
  startupName: string;
  groupName: string;
  leaderName: string;
  mentorName?: string;
};

export type Actions = 'Create' | 'View' | 'Edit' | 'Delete';
