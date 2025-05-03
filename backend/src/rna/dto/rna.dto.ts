import { IsOptional, IsString } from 'class-validator';

export class UpdateStartupRnaDto {
  @IsOptional()
  @IsString()
  rna?: string;
}