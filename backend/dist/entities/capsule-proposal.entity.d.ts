import { Startup } from './startup.entity';
export declare class CapsuleProposal {
    id: number;
    title: string;
    description: string;
    problemStatement: string;
    targetMarket: string;
    solutionDescription: string;
    objectives: string[];
    historicalTimeline: {
        monthYear: string;
        description: string;
    }[];
    competitiveAdvantageAnalysis: {
        competitorName: string;
        offer: string;
        pricingStrategy: string;
    }[];
    members?: {
        name: string;
        role: string;
    }[];
    intellectualPropertyStatus: string;
    curriculumVitae?: string;
    scope: string;
    methodology: string;
    aiAnalysisSummary: string;
    startup: Startup;
}
