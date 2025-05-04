import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStartupRnaDto {
  @IsOptional()
  @IsString()
  rna?: string;
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