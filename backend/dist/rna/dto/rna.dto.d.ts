export declare class UpdateStartupRnaDto {
    rna?: string;
    isAiGenerated?: boolean;
}
export declare class CreateStartupRnaDto {
    rna: string;
    startup_id: number;
    isAiGenerated?: boolean;
    readiness_level_id?: number;
}
export declare class GenerateRNAsDto {
    startup_id: number;
    no_of_tasks_to_create: number;
    debug: boolean;
}
