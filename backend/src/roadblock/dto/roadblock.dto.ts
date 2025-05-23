import {
  IsBoolean,
  IsEnum,
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
  status?: RnsStatus;

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