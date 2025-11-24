import { AiService } from 'src/ai/ai.service';
import { StartupService } from './startup.service';
import { UpdateStartupDto } from '../admin/dto/update-startup.dto';
import { StartupApplicationDto, WaitlistStartupDto, AppointMentorsDto, ChangeMentorDto } from './dto';
export declare class StartupController {
    private startupService;
    private aiService;
    constructor(startupService: StartupService, aiService: AiService);
    getStartups(req: any): Promise<import("@mikro-orm/core").Loaded<import("../entities/startup.entity").Startup, "capsuleProposal" | "mentors", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    getReadinessLevelCriterionAnswers(startupId: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/startup-criterion-answer.entity").StartupCriterionAnswer, "criterion", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    getStartupReadinessLevel(startupId: number): Promise<import("@mikro-orm/core").Loaded<import("../entities/startup-readiness-level.entity").StartupReadinessLevel, "readinessLevel", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    getAllStartups(): Promise<any[]>;
    getStartupsByUrat(): Promise<(import("../entities/startup.entity").Startup & {
        ranking_score: number;
    })[]>;
    getStartupsByRubrics(): Promise<void>;
    applyStartup(dto: StartupApplicationDto, req: any): Promise<{
        message: string;
    }>;
    addMemberToStartup(dto: any): Promise<void>;
    removeMemberFromStartup(userId: number, startupId: number): Promise<void>;
    getCapsuleProposal(file: Express.Multer.File): Promise<void>;
    getStartupById(startupId: number): Promise<import("../entities/startup.entity").Startup | null>;
    getStartupAllowTasksById(startupId: string): Promise<boolean>;
    getCalculatorFinalScores(startupId: number): Promise<void>;
    approveApplicant(startupId: number): Promise<{
        message: string;
    }>;
    waitlistApplicant(startupId: number, dto: WaitlistStartupDto): Promise<{
        message: string;
        waitlistMessage: import("../entities/startup-waitlist-message.entity").StartupWaitlistMessage;
    }>;
    appointMentors(startupId: number, dto: AppointMentorsDto): Promise<{
        message: string;
    }>;
    markStartupComplete(startupId: number): Promise<{
        message: string;
    }>;
    changeMentor(startupId: number, dto: ChangeMentorDto): Promise<{
        message: string;
        startup: import("@mikro-orm/core").Loaded<import("../entities/startup.entity").Startup, "mentors", "*", never>;
    }>;
    allowRNAs(startupId: number): Promise<boolean>;
    allowTasks(startupId: number): Promise<boolean>;
    allowInitiatives(startupId: number): Promise<boolean>;
    allowRoadblocks(startupId: number): Promise<boolean>;
    updateStartup(id: number, dto: UpdateStartupDto): Promise<import("../entities/startup.entity").Startup>;
    reapplyStartup(id: number, dto: StartupApplicationDto, req: any): Promise<import("../entities/startup.entity").Startup>;
}
