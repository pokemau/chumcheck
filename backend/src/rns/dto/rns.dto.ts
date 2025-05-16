import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRnsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  priorityNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readinessTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  targetLevelId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  targetLevelScoreId: number;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  startupId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  taskType: number;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isAiGenerated: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  assigneeId: number;
}
