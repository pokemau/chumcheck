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
  //@ValidateNested({ each: true })
  @Type(() => CalculatorQuestionAnswer)
  calculatorAnswers: CalculatorQuestionAnswer[];
}

//{
//"calculatorAnswers":[
//{"startupId":9,"calculatorQuestionId":1},
//{"startupId":9,"calculatorQuestionId":6},
//{"startupId":9,"calculatorQuestionId":11},
//{"startupId":9,"calculatorQuestionId":16},
//{"startupId":9,"calculatorQuestionId":21},
//{"startupId":9,"calculatorQuestionId":26},
//{"startupId":9,"calculatorQuestionId":31}
//]
//}
