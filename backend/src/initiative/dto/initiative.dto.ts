import {
  IsInt,
  IsEnum,
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsArray,
  IsIn,
} from 'class-validator';
import { RnsStatus } from '../../entities/enums/rns.enum';
import { Type } from 'class-transformer';

export class CreateInitiativeDto {
  @IsInt()
  initiativeNumber: number;
  
  @IsEnum(RnsStatus)
  status: RnsStatus;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  rnsId: number; 

  @IsBoolean()
  isAiGenerated: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  assigneeId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  startupId!: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  measures: string;

  @IsString()
  @IsNotEmpty()
  targets: string;

  @IsString()
  @IsNotEmpty()
  remarks: string;
}

export class UpdateInitiativeDto {
  @IsOptional()
  @IsInt()
  initiativeNumber: number;

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
  rnsId: number; 

  @IsOptional()
  @IsBoolean()
  isAiGenerated: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  assigneeId!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startupId!: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  measures: string;

  @IsString()
  @IsOptional()
  targets: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByMentor?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  clickedByStartup?: boolean;
}

export class GenerateInitiativeDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  rnsId?: number;

  @Type(() => Number)
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  rnsIds?: number[];

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  no_of_initiatives_to_create: number;

  @IsBoolean()
  @IsOptional()
  debug: boolean = false;
}
