export declare class StartupApplicationDtoOld {
    userId: number;
    name: string;
    dataPrivacy: boolean;
    eligibility: boolean;
    links?: string;
    groupName?: string;
    universityName?: string;
}
export declare class AddStartupMemberDto {
    userId: number;
    startupId: number;
}
declare class HistoricalTimelineDto {
    monthYear: string;
    description: string;
}
declare class CompetitiveAdvantageDto {
    competitorName: string;
    offer: string;
    pricingStrategy: string;
}
declare class MemberDto {
    name: string;
    role: string;
}
export declare class StartupApplicationDto {
    title: string;
    description: string;
    problemStatement: string;
    targetMarket: string;
    solutionDescription: string;
    historicalTimeline: HistoricalTimelineDto[];
    competitiveAdvantageAnalysis: CompetitiveAdvantageDto[];
    intellectualPropertyStatus: string;
    objectives: string[];
    proposalScope: string;
    methodology: string;
    members: MemberDto[];
    curriculumVitae: string;
}
export declare class WaitlistStartupDto {
    message: string;
    managerId: number;
}
export declare class AppointMentorsDto {
    mentorIds: number[];
}
export declare class ChangeMentorDto {
    mentorId: number;
}
export {};
