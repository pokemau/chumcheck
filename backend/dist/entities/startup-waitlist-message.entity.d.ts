import { Startup } from './startup.entity';
import { User } from './user.entity';
export declare class StartupWaitlistMessage {
    id: number;
    startup: Startup;
    manager: User;
    message: string;
    createdAt: Date;
}
