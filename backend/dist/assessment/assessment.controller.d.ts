import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { SubmitAssessmentDto } from './dto/assessment.dto';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    listTypes(): Promise<{
        id: number;
        name: string;
    }[]>;
    createType(body: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    renameType(id: number, body: {
        name: string;
    }): Promise<{
        ok: boolean;
    }>;
    deleteType(id: number): Promise<{
        ok: boolean;
    }>;
    listFields(typeId: number): Promise<{
        id: number;
        label: string;
        fieldType: number;
    }[]>;
    createField(body: {
        typeId: number;
        label: string;
        fieldType: number;
    }): Promise<{
        id: number;
    }>;
    updateField(id: number, body: {
        label?: string;
        fieldType?: number;
    }): Promise<{
        ok: boolean;
    }>;
    deleteField(id: number): Promise<{
        ok: boolean;
    }>;
    createStartupAssessment(body: {
        startupId: number;
        assessmentTypeIds: number[];
    }): Promise<{
        ids: number[];
    }>;
    getStartupAssessments(startupId: number): Promise<AssessmentDto[]>;
    submitAssessment(submitDto: SubmitAssessmentDto): Promise<void>;
    markAssessmentComplete(startupId: number, assessmentType: string): Promise<void>;
    markAssessmentPending(startupId: number, assessmentType: string): Promise<void>;
}
