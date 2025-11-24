import { EntityManager } from '@mikro-orm/core';
import { AssessmentDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';
export declare class AssessmentService {
    private readonly em;
    constructor(em: EntityManager);
    listTypes(): Promise<Array<{
        id: number;
        name: string;
    }>>;
    createType(name: string): Promise<{
        id: number;
        name: string;
    }>;
    renameType(id: number, name: string): Promise<void>;
    deleteType(id: number): Promise<void>;
    listFields(typeId: number): Promise<Array<{
        id: number;
        label: string;
        fieldType: number;
    }>>;
    createField(typeId: number, label: string, fieldType: number): Promise<{
        id: number;
    }>;
    updateField(fieldId: number, label?: string, fieldType?: number): Promise<void>;
    deleteField(fieldId: number): Promise<void>;
    getStartupAssessments(startupId: number): Promise<AssessmentDto[]>;
    submitAssessment(submitDto: SubmitAssessmentDto): Promise<void>;
    markAssessmentComplete(startupId: number, assessmentType: string): Promise<void>;
    markAssessmentPending(startupId: number, assessmentType: string): Promise<void>;
    createStartupAssessments(startupId: number, assessmentTypeIds: number[]): Promise<{
        ids: number[];
    }>;
}
