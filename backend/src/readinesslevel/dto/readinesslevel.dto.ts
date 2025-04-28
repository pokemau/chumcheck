import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

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

class CalculatorQuestionAnswer {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startupId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  calculatorQuestionId: number;
}

export class CalculatorQuestionAnswerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CalculatorQuestionAnswer)
  calculatorAnswers: CalculatorQuestionAnswer[];
}

class UratQuestionnswer {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startupId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  uratQuestionId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => String)
  response: string;
}

export class UratQuestionAnswerDto {
  @IsArray()
  @Type(() => UratQuestionnswer)
  answers: UratQuestionnswer[];
}
