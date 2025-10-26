import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class StartupApplicationDtoOld {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  dataPrivacy: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  eligibility: boolean;

  @IsString()
  @IsOptional()
  links?: string;

  @IsString()
  @IsOptional()
  groupName?: string;

  @IsString()
  @IsOptional()
  universityName?: string;
}

export class AddStartupMemberDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startupId: number;
}

class HistoricalTimelineDto {
  @IsString()
  @IsNotEmpty()
  monthYear: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class CompetitiveAdvantageDto {
  @IsString()
  @IsNotEmpty()
  competitorName: string;

  @IsString()
  @IsNotEmpty()
  offer: string;

  @IsString()
  @IsNotEmpty()
  pricingStrategy: string;
}

class MemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class StartupApplicationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  problemStatement: string;

  @IsString()
  @IsNotEmpty()
  targetMarket: string;

  @IsString()
  @IsNotEmpty()
  solutionDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoricalTimelineDto)
  @ArrayMinSize(1)
  historicalTimeline: HistoricalTimelineDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompetitiveAdvantageDto)
  @ArrayMinSize(1)
  competitiveAdvantageAnalysis: CompetitiveAdvantageDto[];

  @IsString()
  @IsNotEmpty()
  intellectualPropertyStatus: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  objectives: string[];

  @IsString()
  @IsNotEmpty()
  proposalScope: string;

  @IsString()
  @IsNotEmpty()
  methodology: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  @ArrayMinSize(1)
  members: MemberDto[];

  @IsString()
  @IsNotEmpty()
  curriculumVitae: string;
}

export class WaitlistStartupDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  managerId: number;
}

export class AppointMentorsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @Type(() => Number)
  mentorIds: number[];
}

export class ChangeMentorDto {
  @IsNotEmpty()
  @IsNumber()
  mentorId: number;
}