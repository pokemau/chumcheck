import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { RnsStatus } from 'src/entities/enums/rns.enum';

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
  @IsEnum(RnsStatus)
  status!: RnsStatus;

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
  @IsBoolean()
  @Type(() => Boolean)
  isAiGenerated?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByMentor?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByStartup?: boolean;
}

export class GenerateTasksDto {
  @Type(() => Number)
  @IsInt()
  startup_id: number;

  @IsOptional()
  @Type(() => Array)
  @IsInt({ each: true })
  rnaIds?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  startPriorityNumber?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  term?: number;

  @Type(() => Number)
  @IsInt()
  no_of_tasks_to_create: number;

  @IsBoolean()
  @IsOptional()
  debug: boolean = false;
}