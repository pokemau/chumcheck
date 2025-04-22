import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class StartupApplicationDto {
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
