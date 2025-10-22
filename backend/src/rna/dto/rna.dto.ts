import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStartupRnaDto {
  @IsOptional()
  @IsString()
  rna?: string;

  @IsOptional()
  @IsBoolean()
  isAiGenerated?: boolean;
}

export class CreateStartupRnaDto {
  @IsString()
  rna: string;

  @IsInt()
  startup_id: number;

  @IsOptional()
  @IsBoolean()
  isAiGenerated?: boolean;

  @IsOptional()
  @IsInt()
  readiness_level_id?: number;
}

export class GenerateRNAsDto {
  @Type(() => Number)
  @IsInt()
  startup_id: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  no_of_tasks_to_create: number;

  @IsBoolean()
  @IsOptional()
  debug: boolean = false;
}
