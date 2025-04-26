import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UratQuestion } from './entities/urat-question.entity';
import { ReadinessType } from './entities/enums/readiness-type.enum';
import { CalculatorCategory } from './entities/enums/calculator-category.enum';
import { CalculatorQuestion } from './entities/calculator-question.entity';

@Injectable()
export class AppService {
  constructor(private em: EntityManager) {}
  getHello(): string {
    return 'Hello World!';
  }

  generateUratQuestions() {
    const questions = [
      {
        question:
          'Describe the current stage of your technology development. Has it been validated in a lab or relevant environment?',
        category: ReadinessType.T,
      },
      {
        question:
          "What evidence can you provide of your technology's functionality and feasibility?",
        category: ReadinessType.T,
      },
      {
        question:
          'How does your current technology development align with your product roadmap and market goals?',
        category: ReadinessType.T,
      },
      {
        question: 'Have you identified your target market and customer base?',
        category: ReadinessType.M,
      },
      {
        question:
          'What market research have you conducted, and what are the key insights?',
        category: ReadinessType.M,
      },
      {
        question:
          'How are you planning to address the market needs and challenges identified in your research?',
        category: ReadinessType.M,
      },
      {
        question:
          'Have you received feedback from potential users or stakeholders about your product/service?',
        category: ReadinessType.A,
      },
      {
        question:
          'How have you integrated this feedback into your development process?',
        category: ReadinessType.A,
      },
      {
        question:
          'What steps have you taken to gauge and build market acceptance for your offering?',
        category: ReadinessType.A,
      },
      {
        question:
          'Describe your organizational structure and the roles of your team members.',
        category: ReadinessType.O,
      },
      {
        question: 'How are internal processes managed within your startup?',
        category: ReadinessType.O,
      },
      {
        question:
          'What strategies do you have in place for team development and operational efficiency?',
        category: ReadinessType.O,
      },
      {
        question:
          'Are you aware of the regulatory requirements relevant to your product or service?',
        category: ReadinessType.R,
      },
      {
        question:
          'Have you begun planning or implementing compliance strategies?',
        category: ReadinessType.R,
      },
      {
        question:
          'How do you manage and stay updated with changes in regulatory requirements?',
        category: ReadinessType.R,
      },
      {
        question:
          "What are your startup's funding goals, and what is your plan to achieve them?",
        category: ReadinessType.I,
      },
      {
        question:
          'Have you prepared an investment proposal or pitch for potential investors?',
        category: ReadinessType.I,
      },
      {
        question:
          'What steps have you taken to understand and engage with potential investors?',
        category: ReadinessType.I,
      },
    ];

    for (let i = 0; i < questions.length; i++) {
      const q = new UratQuestion();
      q.question = questions[i].question;
      q.readinessType = questions[i].category;

      this.em.persistAndFlush(q);
    }
  }

  generateCalculatorQuestions() {
    const questions = [
      {
        question:
          'Project work is beyond basic research and technology concept has been defined',
        score: 1,
        category: CalculatorCategory.Technology,
      },
      {
        question:
          'Applied research has begun and practical application(s) have been identified',
        score: 2,
        category: CalculatorCategory.Technology,
      },
      {
        question:
          'Preliminary testing of technology components has begun, and technical feasibility has been established in a laboratory environment',
        score: 3,
        category: CalculatorCategory.Technology,
      },
      {
        question:
          'Initial testing of integrated product/system has been completed in a laboratory environment',
        score: 4,
        category: CalculatorCategory.Technology,
      },
      {
        question:
          'Laboratory scale integrated product/system demonstrates performance in the intended application(s)',
        score: 5,
        category: CalculatorCategory.Technology,
      },
      {
        question: 'Initial product/market fit has been defined',
        score: 1,
        category: CalculatorCategory.Product_Development,
      },
      {
        question:
          'Pilot scale product/system has been tested in the intended application(s)',
        score: 2,
        category: CalculatorCategory.Product_Development,
      },
      {
        question:
          'Demonstration of a full scale product/system prototype has been completed in the intended application(s)',
        score: 3,
        category: CalculatorCategory.Product_Development,
      },
      {
        question:
          'Actual product/system has been proven to work in its near-final form under a representative set of expected conditions and environments',
        score: 4,
        category: CalculatorCategory.Product_Development,
      },
      {
        question:
          'Product/system is in final form and has been operated under the full range of operating conditions and environments',
        score: 5,
        category: CalculatorCategory.Product_Development,
      },
      {
        question: 'One or more initial product hypotheses have been defined',
        score: 1,
        category: CalculatorCategory.Product_Development,
      },
      {
        question:
          'Mapping product/system attributes against customer needs has highlighted a clear value proposition',
        score: 2,
        category: CalculatorCategory.Product_Definition_Design,
      },
      {
        question:
          'The product/system has been scaled from laboratory to pilot scale and issues that may affect achieving full scale have been identified',
        score: 3,
        category: CalculatorCategory.Product_Definition_Design,
      },
      {
        question:
          'Comprehensive customer value proposition model has been developed, including a detailed understanding of product/system design specifications, required certifications, and trade-offs',
        score: 4,
        category: CalculatorCategory.Product_Definition_Design,
      },
      {
        question:
          'Product/system final design optimization has been completed, required certifications have been obtained, and product/system has incorporated detailed customer and product requirements',
        score: 5,
        category: CalculatorCategory.Product_Definition_Design,
      },
      {
        question:
          'Secondary market research has been performed and basic knowledge of potential applications and competitive landscape have been identified',
        score: 1,
        category: CalculatorCategory.Product_Definition_Design,
      },
      {
        question:
          'Primary market research to prove the product/system commercial feasibility has been completed and basic understanding of competitive products/systems has been demonstrated',
        score: 2,
        category: CalculatorCategory.Competitive_Landscape,
      },
      {
        question:
          'Comprehensive market research to prove the product/system commercial feasibility has been completed and intermediate understanding of competitive products/systems has been demonstrated',
        score: 3,
        category: CalculatorCategory.Competitive_Landscape,
      },
      {
        question:
          'Competitive analysis to illustrate unique features and advantages of the product/system compared to competitive products/systems has been completed',
        score: 4,
        category: CalculatorCategory.Competitive_Landscape,
      },
      {
        question:
          'Full and complete understanding of the competitive landscape, target application(s), competitive products/systems, and market has been achieved',
        score: 5,
        category: CalculatorCategory.Competitive_Landscape,
      },
      {
        question:
          'No team or company in place (single individual, no legal entity)',
        score: 1,
        category: CalculatorCategory.Competitive_Landscape,
      },
      {
        question:
          'Solely technical or non-technical founder(s) running the company with no outside assistance',
        score: 2,
        category: CalculatorCategory.Team,
      },
      {
        question:
          'Solely technical or non-technical founder(s) running the company with assistance from outside advisors/mentors and/or incubator/accelerator',
        score: 3,
        category: CalculatorCategory.Team,
      },
      {
        question:
          'Balanced team with technical and business development/commercialization experience running the company with assistance from outside advisors/mentors',
        score: 4,
        category: CalculatorCategory.Team,
      },
      {
        question:
          'Balanced team with all capabilities onboard (e.g. sales, marketing, customer service, operations, etc.) running the company with assistance from outside advisors/mentors',
        score: 5,
        category: CalculatorCategory.Team,
      },
      {
        question:
          'Initial business model and value proposition have been defined',
        score: 1,
        category: CalculatorCategory.Go_To_Market,
      },
      {
        question:
          'Customers/partners have been interviewed to understand their pain points/needs, and business model and value proposition have been refined based on customer/partner feedback',
        score: 2,
        category: CalculatorCategory.Go_To_Market,
      },
      {
        question:
          'Market and customer/partner needs and how those translate to product requirements have been defined, and initial relationships have been developed with key stakeholders across the value chain',
        score: 3,
        category: CalculatorCategory.Go_To_Market,
      },
      {
        question:
          'Partnerships have been formed with key stakeholders across the value chain (e.g. suppliers, partners, service providers, and customers)',
        score: 4,
        category: CalculatorCategory.Go_To_Market,
      },
      {
        question:
          'Supply agreements with suppliers and partners are in place and initial purchase orders from customers have been received',
        score: 5,
        category: CalculatorCategory.Go_To_Market,
      },
      {
        question:
          'Potential suppliers, partners, and customers have been identified and mapped in an initial value chain analysis',
        score: 1,
        category: CalculatorCategory.Manufacturing_Supply_Chain,
      },
      {
        question:
          'Relationships have been established with potential suppliers, partners, service providers, and customers and they have provided input on product and manufacturability requirements',
        score: 2,
        category: CalculatorCategory.Manufacturing_Supply_Chain,
      },
      {
        question:
          'Manufacturing process qualifications (e.g. QC/QA) have been defined and are in progress',
        score: 3,
        category: CalculatorCategory.Manufacturing_Supply_Chain,
      },
      {
        question:
          'Products/systems have been pilot manufactured and sold to initial customers',
        score: 4,
        category: CalculatorCategory.Manufacturing_Supply_Chain,
      },
      {
        question:
          'Full scale manufacturing and widespread deployment of product/system to customers and/or users has been achieved',
        score: 5,
        category: CalculatorCategory.Manufacturing_Supply_Chain,
      },
    ];

    for (let i = 0; i < questions.length; i++) {
      const q = new CalculatorQuestion();
      q.question = questions[i].question;
      q.score = questions[i].score;
      q.category = questions[i].category;
      this.em.persistAndFlush(q);
    }
  }
}
