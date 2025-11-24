import { QualificationStatus } from '../../entities/enums/qualification-status.enum';
export declare class CreateStartupDto {
    name: string;
    userId: number;
    qualificationStatus: QualificationStatus;
    dataPrivacy?: boolean;
    links?: string;
    groupName?: string;
    universityName?: string;
    eligibility?: boolean;
}
