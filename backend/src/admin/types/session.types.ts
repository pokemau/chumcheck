import { Role } from '../../entities/enums/role.enum';

export interface AdminUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}

declare module 'express-session' {
  interface SessionData {
    user?: AdminUser;
  }
}
