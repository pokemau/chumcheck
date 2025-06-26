import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RnsStatus } from 'src/entities/enums/rns.enum';

export class CreateRoadblockDto {
  @IsNumber()
  @Type(() => Number)
  assigneeId: number;

  @IsNumber()
  @Type(() => Number)
  startupId: number;

  @IsBoolean()
  isAiGenerated: boolean;

  @IsEnum(RnsStatus)
  status: RnsStatus;

  @IsNumber()
  @Type(() => Number)
  riskNumber: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  fix: string;
}

export class UpdateRoadblockDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  assigneeId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startupId?: number;

  @IsOptional()
  @IsBoolean()
  isAiGenerated?: boolean;

  @IsOptional()
  @IsEnum(RnsStatus)
  status: RnsStatus;

  @IsOptional()
  @IsEnum(RnsStatus)
  requestedStatus: RnsStatus;

  @IsOptional()
  @IsString()
  @IsIn(['Pending', 'Approved', 'Denied', 'Unchanged'])
  approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  riskNumber?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fix?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByMentor?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByStartup?: boolean;
}

export class GenerateRoadblocksDto {
  @Type(() => Number)
  @IsInt()
  startupId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  no_of_roadblocks_to_create: number;

  @IsBoolean()
  @IsOptional()
  debug: boolean = false;
}