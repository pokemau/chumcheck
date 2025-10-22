import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ElevateStartupDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startupId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readinessLevelId: number;

  @IsString()
  remark: string;
}
