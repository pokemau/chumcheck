import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CalculatorQuestion } from 'src/entities/calculator-question.entity';
import { UratQuestion } from 'src/entities/urat-question.entity';
import { CalculatorQuestionAnswerDto, UratQuestionAnswerDto } from './dto';
import { CalculatorQuestionAnswer } from 'src/entities/calculator-question-answer.entity';
import { User } from 'src/entities/user.entity';
import { Startup } from 'src/entities/startup.entity';
import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';
import { ReadinessLevel } from 'src/entities/readinesslevel.entity';

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

  async getReadinessLevels(){
    return await this.em.findAll(ReadinessLevel);
  }

  async createUratQuestionAnswers(dto: UratQuestionAnswerDto) {
    const answers = await Promise.all(
      dto.answers.map(async (answer) => {
        const question = await this.em.findOneOrFail(
          UratQuestion,
          { id: answer.uratQuestionId },
          {
            failHandler: () =>
              new Error(
                `CalculatorQuestion with ID ${answer.uratQuestionId} not found`,
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

        const uratQuestionAnswer = new UratQuestionAnswer();
        uratQuestionAnswer.uratQuestion = question;
        uratQuestionAnswer.startup = startup;
        uratQuestionAnswer.response = answer.response;
        return uratQuestionAnswer;
      }),
    );
    await this.em.persistAndFlush(answers);
    return { message: 'URAT Question Answers created successfully!' };
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
    return { message: 'Calculator Question Answers created successfully!' };
  }

  async getUratQuestionAnswers(startupId: number) {
    const answers = await this.em.find(
      UratQuestionAnswer,
      {
        startup: startupId,
      },
      { populate: ['uratQuestion'] },
    );

    return answers.map((answer) => ({
      id: answer.id,
      response: answer.response,
      score: answer.score,
      startupId: answer.startup.id,
      questionId: answer.uratQuestion.id,
      readinessType: answer.uratQuestion.readinessType,
    }));
  }
}
