import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { QualificationStatus } from '../../entities/enums/qualification-status.enum';

export class CreateStartupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @Transform(({ value }) => {
    if (
      typeof value === 'string' &&
      QualificationStatus[value as keyof typeof QualificationStatus] !==
        undefined
    ) {
      return QualificationStatus[value as keyof typeof QualificationStatus];
    }
    return value;
  })
  @IsEnum(QualificationStatus)
  @IsNotEmpty()
  qualificationStatus!: QualificationStatus;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  dataPrivacy?: boolean;

  @IsString()
  @IsOptional()
  links?: string;

  @IsString()
  @IsOptional()
  groupName?: string;

  @IsString()
  @IsOptional()
  universityName?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  eligibility?: boolean;
}
