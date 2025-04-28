import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CalculatorQuestion } from 'src/entities/calculator-question.entity';
import { UratQuestion } from 'src/entities/urat-question.entity';
import { CalculatorQuestionAnswerDto } from './dto';
import { CalculatorQuestionAnswer } from 'src/entities/calculator-question-answer.entity';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';

@Injectable()
export class ReadinesslevelService {
  constructor(private em: EntityManager) {}

  async getUratQuestions() {
    return await this.em.findAll(UratQuestion);
  }
  async getCalculatorQuestions() {
    const calcQuestions = await this.em.findAll(CalculatorQuestion);

    const categoryMap = {};

    calcQuestions.forEach((item) => {
      const { category, id, question, score } = item;
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push({ id, question, score });
    });

    const res = Object.keys(categoryMap).map((category) => ({
      category,
      questions: categoryMap[category],
    }));
    let selectedValues: { [key: string]: string } = {};

    res.forEach((category) => {
      if (!selectedValues[category.category] && category.questions.length > 0) {
        selectedValues[category.category] = `${category.questions[0].id}`;
      }
    });

    return res;
  }

  async createCalculatorQuestionAnswers(dto: CalculatorQuestionAnswerDto) {
    const answers = await Promise.all(
      dto.calculatorAnswers.map(async (answer) => {
        const question = await this.em.findOneOrFail(
          CalculatorQuestion,
          { id: answer.calculatorQuestionId },
          {
            failHandler: () =>
              new Error(
                `CalculatorQuestion with ID ${answer.calculatorQuestionId} not found`,
              ),
          },
        );

        const startup = await this.em.findOneOrFail(
          Startup,
          { id: answer.startupId },
          {
            failHandler: () =>
              new Error(`Startup with ID ${answer.startupId} not found`),
          },
        );

        const calcQuestionAnswer = new CalculatorQuestionAnswer();
        calcQuestionAnswer.question = question;
        calcQuestionAnswer.startup = startup;
        return calcQuestionAnswer;
      }),
    );
    await this.em.persistAndFlush(answers);
    return { message: 'Answers created successfully!' };
  }
}
