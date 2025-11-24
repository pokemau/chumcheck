import { EntityManager } from '@mikro-orm/postgresql';
import { Startup } from 'src/entities/startup.entity';
import { StartupCriterionAnswer } from 'src/entities/startup-criterion-answer.entity';
import { QualificationStatus } from 'src/entities/enums/qualification-status.enum';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { StartupWaitlistMessage } from 'src/entities/startup-waitlist-message.entity';
import { CreateCapsuleProposalDto } from './dto/create-capsule-proposal.dto';
import { UpdateStartupDto } from '../admin/dto/update-startup.dto';
import { StartupApplicationDto, StartupApplicationDtoOld, WaitlistStartupDto, AppointMentorsDto, ChangeMentorDto } from './dto';
import { AiService } from '../ai/ai.service';
import { CreateStartupDto } from '../admin/dto/create-startup.dto';
export declare class StartupService {
    private em;
    private readonly aiService;
    constructor(em: EntityManager, aiService: AiService);
    getStartups(userId: number): Promise<import("@mikro-orm/postgresql").Loaded<Startup, "capsuleProposal" | "mentors", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findAll(): Promise<Startup[]>;
    getAllStartups(): Promise<Startup[]>;
    getStartupById(startupId: number): Promise<Startup | null>;
    create(dto: StartupApplicationDto, userId: number): Promise<Startup>;
    private createStartupProposal;
    update(id: number, dto: UpdateStartupDto): Promise<Startup>;
    updateWithCapsuleProposal(id: number, dto: UpdateStartupDto, capsuleProposalDto?: CreateCapsuleProposalDto): Promise<void>;
    remove(id: number): Promise<void>;
    createStartup(dto: StartupApplicationDtoOld): Promise<void>;
    removeMemberFromStartup(userId: number, startupId: number): Promise<void>;
    addMemberToStartup(dto: any): Promise<void>;
    getPendingStartupsRankingByUrat(): Promise<(Startup & {
        ranking_score: number;
    })[]>;
    getQualifiedStartupsRankingByRubrics(): Promise<void>;
    getStartupsByQualificationStatus(qualificationStatus: QualificationStatus): Promise<any[]>;
    getCalculatorFinalScores(startupId: number): Promise<void>;
    approveApplicant(startupId: number): Promise<{
        message: string;
    }>;
    waitlistApplicant(startupId: number, dto: WaitlistStartupDto): Promise<{
        message: string;
        waitlistMessage: StartupWaitlistMessage;
    }>;
    appointMentors(startupId: number, dto: AppointMentorsDto): Promise<{
        message: string;
    }>;
    allowRNAs(startupId: number): Promise<boolean>;
    allowTasks(startupId: number): Promise<boolean>;
    allowInitiatives(startupId: number): Promise<boolean>;
    allowRoadblocks(startupId: number): Promise<boolean>;
    markComplete(startupId: number): Promise<{
        message: string;
    }>;
    changeMentor(startupId: number, dto: ChangeMentorDto): Promise<{
        message: string;
        startup: import("@mikro-orm/postgresql").Loaded<Startup, "mentors", "*", never>;
    }>;
    private calculateTechnologyLevel;
    private calculateLevels;
    getReadinessLevelCriterionAnswers(startupId: number): Promise<import("@mikro-orm/postgresql").Loaded<StartupCriterionAnswer, "criterion", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    getStartupReadinessLevel(startupId: number): Promise<import("@mikro-orm/postgresql").Loaded<StartupReadinessLevel, "readinessLevel", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    private createStartupReadinessLevels;
    adminCreate(dto: CreateStartupDto): Promise<Startup>;
    updateCapsuleProposal(startupId: number, dto: StartupApplicationDto): Promise<Startup>;
}
