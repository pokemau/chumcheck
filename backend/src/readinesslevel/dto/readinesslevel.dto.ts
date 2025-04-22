import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UratQuestionDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startupId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  uratQuestionId: number;

  @IsNotEmpty()
  @IsString()
  response: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  score: number;
}

export class CalculatorQuestionDto {}
