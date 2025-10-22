import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Type, Transform } from 'class-transformer'; // Re-added Transform
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
    // Check if the value is a string and a valid key in the QualificationStatus enum
    if (
      typeof value === 'string' &&
      QualificationStatus[value as keyof typeof QualificationStatus] !==
        undefined
    ) {
      return QualificationStatus[value as keyof typeof QualificationStatus]; // Return the numeric value
    }
    // If it's already a number (e.g., from a raw JSON body or already transformed), or invalid, pass it through for @IsEnum to validate
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
