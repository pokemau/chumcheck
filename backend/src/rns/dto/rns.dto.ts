import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';

export class CreateRnsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  assigneeId!: number;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description!: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isAiGenerated!: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  priorityNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  status!: number;

  @IsNotEmpty()
  @IsEnum(ReadinessType)
  readinessType!: ReadinessType;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  startupId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  targetLevelId!: number;
}

export class UpdateRnsDto {
  @IsOptional()
  @IsEnum(ReadinessType)
  @Type(() => String)
  readinessType?: ReadinessType;

  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  targetLevel?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  assigneeId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priorityNumber?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isAiGenerated?: boolean;
}

export class GenerateTasksDto {
  @Type(() => Number)
  @IsInt()
  startup_id: number;

  @IsString()
  @IsEnum(ReadinessType)
  readinessType: ReadinessType;

  @Type(() => Number)
  @IsInt()
  term: number;

  @Type(() => Number)
  @IsInt()
  no_of_tasks_to_create: number;

  @IsBoolean()
  @IsOptional()
  debug: boolean = false;
}