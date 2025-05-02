import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StartupApplicationDto } from './dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Startup } from 'src/entities/startup.entity';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/enums/role.enum';
import { StartupCriterionAnswer } from 'src/entities/startup-criterion-answer.entity';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';
import { UratQuestionAnswer } from 'src/entities/urat-question-answer.entity';
import { QualificationStatus } from 'src/entities/enums/qualification-status.enum';
import { CalculatorQuestionAnswer } from 'src/entities/calculator-question-answer.entity';
import { CalculatorCategory } from 'src/entities/enums/calculator-category.enum';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';

@Injectable()
export class StartupService {
  constructor(private em: EntityManager) {}

  async getStartups(userId: number) {
    const user = await this.em.findOne(User, { id: userId });

    if (!user)
      throw new NotFoundException(`User with ID ${userId} does not exist`);

    switch (user.role) {
      case Role.Startup:
        return await this.em.find(Startup, {
          user: userId,
        });
      case Role.Mentor:
        return await this.em.find(
          Startup,
          { mentors: { id: userId } },
          { populate: ['mentors'] },
        );
    }
  }

  async getStartupById(startupId: number) {
    return await this.em.findOne(Startup, { id: startupId });
  }

  async createStartup(dto: StartupApplicationDto) {
    const startup = new Startup();

    const user = await this.em.findOne(User, { id: dto.userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} does not exist.`);
    }

    startup.name = dto.name;

    startup.user = user;
    startup.dataPrivacy = dto.dataPrivacy;
    startup.eligibility = dto.eligibility;

    await this.em.persistAndFlush(startup);
    return startup;
  }

  async getPendingStartupsRankingByUrat() {
    // Fetch all UratQuestionAnswers with their startup relation
    const allAnswers = await this.em.find(UratQuestionAnswer, {}, {
      populate: ['startup'],
    });
  
    if (!allAnswers || allAnswers.length === 0) {
      console.warn('No UratQuestionAnswers found.');
      return [];
    }
  
    // Group by startup and sum scores
    const startupScoreMap = new Map<number, number>();
    for (const answer of allAnswers) {
      const startupId = answer.startup.id;
      const currentScore = startupScoreMap.get(startupId) || 0;
      startupScoreMap.set(startupId, currentScore + answer.score);
    }
    if (startupScoreMap.size === 0) {
      console.warn('No scores were calculated for startups.');
      return [];
    }
  
    // Add technology level to each startup's score
    const finalScores: { startup_id: number; score: number }[] = [];
    for (const [startupId, uratScore] of startupScoreMap.entries()) {
      const technologyLevel = await this.calculateTechnologyLevel(startupId);
      finalScores.push({
        startup_id: startupId,
        score: uratScore + technologyLevel,
      });
    }
    if (finalScores.length === 0) {
      console.warn('No final scores were calculated.');
      return [];
    }
  
    // Sort by total score descending order
    finalScores.sort((a, b) => b.score - a.score);
  
    // Fetch the startups
    const startupIds = finalScores.map((ranking) => ranking.startup_id);
    const startups = await this.em.find(Startup, {
      id: { $in: startupIds },
    });
    if (!startups || startups.length === 0) {
      console.warn('No startups found for the calculated IDs.');
      return [];
    }
  
    // Map by ID for ordered results
    const startupsMap = new Map<number, Startup>();
    for (const startup of startups) {
      startupsMap.set(startup.id, startup);
    }
    const orderedStartups = finalScores
      .map((ranking) => {
        const startup = startupsMap.get(ranking.startup_id);
        if (startup) {
          return {
            ...startup,
            ranking_score: ranking.score,
          };
        }
        return null;
      })
      .filter((startup): startup is Startup & { ranking_score: number } => Boolean(startup)); // Remove nulls

    if (orderedStartups.length === 0) {
      console.warn('No startups matched the final scores.');
      return [];
    }
  
    return orderedStartups;
  }

  async getQualifiedStartupsRankingByRubrics() {
    // Define readiness type weights
    const readinessTypeWeights: Record<string, number> = {
      "Technology": 4,
      "Market": 3,
      "Regulatory": 2,
      "Acceptance": 2,
      "Organizational": 2,
      "Investment": 2,
    };
  
    // Fetch the latest readiness levels for each startup and readiness type
    const uratQuestionAnswers = await this.em.find(UratQuestionAnswer, {}, {
      populate: ['uratQuestion', 'startup'],
    });

    // Calculate weighted scores for each startup
    const startupScores: { startup_id: number; weighted_score: number }[] = [];

    for (const uratQuestionAnswer of uratQuestionAnswers) {
      const readinessType = uratQuestionAnswer.uratQuestion.readinessType;
      const weight = readinessTypeWeights[readinessType] || 0;

      const weightedScore = uratQuestionAnswer.score * weight;

      startupScores.push({
        startup_id: uratQuestionAnswer.startup.id,
        weighted_score: weightedScore,
      });
    }

    // Aggregate total weighted scores for each startup
    const totalWeightedScores: Record<number, number> = {};

    for (const score of startupScores) {
      const startupId = score.startup_id;
      if (!totalWeightedScores[startupId]) {
        totalWeightedScores[startupId] = 0;
      }
      totalWeightedScores[startupId] += score.weighted_score;
    }

    // Rank startups by their total weighted scores
    const rankedStartups = Object.entries(totalWeightedScores)
      .map(([startupId, totalWeightedScore]) => ({
        startup_id: Number(startupId),
        total_weighted_score: totalWeightedScore,
      }))
      .sort((a, b) => b.total_weighted_score - a.total_weighted_score);

    // Fetch the startups in the ranked order
    const startupIds = rankedStartups.map((ranking) => ranking.startup_id);
    const startups = await this.em.find(Startup, {
      id: { $in: startupIds },
      qualificationStatus: QualificationStatus.QUALIFIED,
    }, {
      populate: ['mentors'], // Populate mentors for each startup
    });

    if (!startups || startups.length === 0) {
      console.warn('No startups found for the calculated IDs.');
      return [];
    }

    // Map startups by ID for ordered retrieval
    const startupsMap = startups.reduce((map, startup) => {
      map[startup.id] = startup;
      return map;
    }, {});

    const orderedStartups = rankedStartups
      .map((ranking) => {
        const startup = startupsMap[ranking.startup_id];
        if (startup) {
          return {
            ...startup, // Include all fields of the Startup entity
            mentors: startup.mentors.getItems().map((mentor: User) => ({
              id: mentor.id,
              firstName: mentor.firstName,
              lastName: mentor.lastName,
            })),
            ranking_score: ranking.total_weighted_score, // Add the ranking score
          };
        }
        return null;
      })
      .filter((startup): startup is Startup & { ranking_score: number } => Boolean(startup)); // Remove nulls
    if (orderedStartups.length === 0) {
      console.warn('No startups matched the final scores.');
      return [];
    }

    return orderedStartups;
  }

  async getCalculatorFinalScores(startupId: number) {
    // Initialize an object to store scores grouped by category
    let calculatorAnswers = await this.calculateLevels(startupId);

    const scoresByCategory: Record<string, number> = {
      [CalculatorCategory.Technology]: calculatorAnswers.technologyScore,
      [CalculatorCategory.Product_Development]: calculatorAnswers.productDevelopment,
      [CalculatorCategory.Product_Definition_Design]: calculatorAnswers.productDefinition,
      [CalculatorCategory.Competitive_Landscape]: calculatorAnswers.competitiveLandscape,
      [CalculatorCategory.Team]: calculatorAnswers.team,
      [CalculatorCategory.Go_To_Market]: calculatorAnswers.goToMarket,
      [CalculatorCategory.Manufacturing_Supply_Chain]: calculatorAnswers.supplyChain,
      "Technology Level": calculatorAnswers.technologyLevel,
      "Commercialization Level": calculatorAnswers.commercializationLevel,
    };

    return scoresByCategory
  }

  async rateApplicant(
    startupId: number,
    scores: { readinessType: string; questionId: number; score: number }[]
  ) {
    // Fetch the startup
    const startup = await this.em.findOneOrFail(Startup, { id: startupId }, {
      failHandler: () => new Error(`Startup with ID ${startupId} not found`),
    });
  
    // Update scores for the provided URAT Question Answers
    for (const { questionId, score } of scores) {
      const uratQuestionAnswer = await this.em.findOneOrFail(
        UratQuestionAnswer,
        { id: questionId, startup }, // Ensure the question belongs to the given startup
        {
          failHandler: () =>
            new Error(
              `UratQuestionAnswer with ID ${questionId} not found for Startup ID ${startupId}`
            ),
        }
      );
  
      uratQuestionAnswer.score = score;
    }
  
    // Update the qualification status of the startup
    if (startup.qualificationStatus === QualificationStatus.PENDING) {
      startup.qualificationStatus = QualificationStatus.RATED;
    }
  
    // Persist changes to the database
    await this.em.flush();
  
    return { message: 'Scores updated and qualification status updated successfully!' };
  }


  async approveApplicant(startupId: number) {
    const startup = await this.em.findOne(Startup, { id: startupId });
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startupId} does not exist.`);
    }
 
    // Maybe (if have time) add logic for sending the startup an email that they got approved
    
    startup.qualificationStatus = QualificationStatus.QUALIFIED;
    this.createStartupReadinessLevels(startupId);
  
    await this.em.flush();
    return { message: `Startup with ID ${startupId} has been approved.` };
  }


  async rejectApplicant(startupId: number) {
    const startup = await this.em.findOne(Startup, { id: startupId });
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startupId} does not exist.`);
    }

    // Maybe (if have time) add logic for sending the startup an email that they got approved
  
    startup.datetimeDeleted = new Date();
    startup.qualificationStatus = QualificationStatus.REJECTED;
  
    await this.em.flush();
    return { message: `Startup with ID ${startupId} has been rejected.` };
  }


  async appointMentors(startupId: number, mentorIds: number[], cohortId: number) {
    const startup = await this.em.findOne(Startup, { id: startupId });
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startupId} does not exist.`);
    }
  
    const mentors = await this.em.find(User, { id: { $in: mentorIds }, role: Role.Mentor });
    if (mentors.length !== mentorIds.length) {
      throw new BadRequestException('One or more mentor IDs are invalid.');
    }
    startup.mentors.set(mentors);
  
    // Cohort ID given but we dont know what they are for yet
    // if (cohortId) {
    //   startup.cohortId = cohortId;
    // }

    await this.em.flush();
    return { message: `Mentors have been successfully assigned to Startup ID ${startupId}.` };
  }


  private async calculateTechnologyLevel(startupId: number): Promise<number> {
    const { technologyLevel } = await this.calculateLevels(startupId);
    return technologyLevel;
  }

  private async calculateLevels(startupId: number): Promise<{
      technologyLevel: number;
      commercializationLevel: number;
      technologyScore: number;
      productDevelopment: number;
      productDefinition: number;
      competitiveLandscape: number;
      team: number;
      goToMarket: number;
      supplyChain: number;
    }> {
      const calculatorAnswers = await this.em.find(CalculatorQuestionAnswer, {
        startup: startupId,
      }, {
        populate: ['question'], // Ensure the question relationship is populated
      });

      let technologyLevel = 1;
      let commercializationLevel = 1;
      let technologyScore = 0;
      let productDevelopment = 0;
      let productDefinition = 0;
      let competitiveLandscape = 0;
      let team = 0;
      let goToMarket = 0;
      let supplyChain = 0;

      for (const answer of calculatorAnswers) {
        const question = answer.question;
        const category = question.category.toLowerCase();

        if (category === 'technology') {
          technologyScore += question.score;
        } else if (category === 'product development') {
          productDevelopment += question.score;
        } else if (category === 'product definition/design') {
          productDefinition += question.score;
        } else if (category === 'competitive landscape') {
          competitiveLandscape += question.score;
        } else if (category === 'team') {
          team += question.score;
        } else if (category === 'go-to-market') {
          goToMarket += question.score;
        } else if (category === 'manufacturing/supply chain') {
          supplyChain += question.score;
        }
      }

      if (technologyScore >= 4) technologyLevel = 4;
      if (technologyScore >= 5) technologyLevel = 5;
      if (productDevelopment >= 2 && productDefinition >= 3) technologyLevel = 6;
      if (productDevelopment >= 3) technologyLevel = 7;
      if (productDevelopment >= 4) technologyLevel = 8;
      if (productDevelopment >= 5) technologyLevel = 9;

      if (competitiveLandscape >= 1 && team >= 1) commercializationLevel = 1;
      if (competitiveLandscape >= 2 && team === 2) commercializationLevel = 2;
      if (
        productDevelopment >= 1 &&
        productDefinition >= 1 &&
        competitiveLandscape >= 3 &&
        team >= 2 &&
        goToMarket >= 1
      ) {
        commercializationLevel = 3;
      }
      if (
        productDefinition >= 2 &&
        competitiveLandscape >= 4 &&
        team >= 2 &&
        goToMarket >= 2 &&
        supplyChain >= 1
      ) {
        commercializationLevel = 4;
      }
      if (
        productDefinition >= 4 &&
        competitiveLandscape >= 5 &&
        team >= 3 &&
        goToMarket >= 3 &&
        supplyChain >= 2
      ) {
        commercializationLevel = 5;
      }
      if (productDefinition >= 5 && team >= 4 && goToMarket >= 4) {
        commercializationLevel = 6;
      }
      if (team >= 4 && supplyChain >= 3) commercializationLevel = 7;
      if (team >= 5 && supplyChain >= 4) commercializationLevel = 8;
      if (team >= 5 && supplyChain >= 5) commercializationLevel = 9;

      return {
        technologyLevel,
        commercializationLevel,
        technologyScore,
        productDevelopment,
        productDefinition,
        competitiveLandscape,
        team,
        goToMarket,
        supplyChain,
      };
  }

  async getReadinessLevelCriterionAnswers(startupId: number) {
    return this.em.find(StartupCriterionAnswer, {
      startup: startupId, 
    },{populate: ['criterion'],
      orderBy: {
        id: 'ASC',
      },
    });
  }

  async getStartupReadinessLevel(startupId: number) {
    return this.em.find(StartupReadinessLevel, {
    startup: startupId ,
    },{populate: ['readinessLevel'],
      orderBy: {
        id: 'ASC',
      },
    });
  }

  private async createStartupReadinessLevels(startupId: number): Promise<StartupReadinessLevel[]> {
    // Fetch the startup
    const startup = await this.em.findOne(Startup, { id: startupId });
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startupId} does not exist`);
    }

    const uratQuestionAnswers = await this.em.find(UratQuestionAnswer, {
      startup: startupId,
    }, {
      populate: ['uratQuestion'],
    });

    // Calculate total scores for each ReadinessType
    const scoresByReadinessType: Record<ReadinessType, number> = {
      [ReadinessType.T]: 0,
      [ReadinessType.M]: 0,
      [ReadinessType.R]: 0,
      [ReadinessType.A]: 0,
      [ReadinessType.O]: 0,
      [ReadinessType.I]: 0,
    };
    for (const answer of uratQuestionAnswers) {
      const readinessType = answer.uratQuestion.readinessType;
      scoresByReadinessType[readinessType] += answer.score;
    }
  
    // Normalize scores by dividing by 3
    for (const readinessType in scoresByReadinessType) {
      scoresByReadinessType[readinessType] = Math.ceil(scoresByReadinessType[readinessType] / 3);
    }
  
    // Fetch all readiness levels
    const readinessLevels = await this.em.find(ReadinessLevel, {});
    const readinessLevelsByType = readinessLevels.reduce((map, level) => {
      if (!map[level.readinessType]) {
        map[level.readinessType] = [];
      }
      map[level.readinessType].push(level);
      return map;
    }, {} as Record<ReadinessType, ReadinessLevel[]>);
  
    // Create a StartupReadinessLevel for each ReadinessType
    const startupReadinessLevels: StartupReadinessLevel[] = [];
    for (const readinessType of Object.values(ReadinessType)) {
      const score = scoresByReadinessType[readinessType] || 1; // Default to 1 if no score
      const levels = readinessLevelsByType[readinessType];
  
      if (!levels || levels.length === 0) {
        throw new BadRequestException(`No readiness levels found for type: ${readinessType}`);
      }
  
      // Map the normalized score directly to the corresponding level
      const selectedLevel = levels.find((level) => level.level === score) || levels[5]; // Default to the first level if no match
  
      const startupReadinessLevel = new StartupReadinessLevel();
      startupReadinessLevel.startup = startup;
      startupReadinessLevel.readinessLevel = selectedLevel;
  
      this.em.persist(startupReadinessLevel);
      startupReadinessLevels.push(startupReadinessLevel);
    }

    // Save all the new StartupReadinessLevel entities
    await this.em.flush();
  
    return startupReadinessLevels;
  }
}
