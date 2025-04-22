import { Body, Controller, Get, Post } from '@nestjs/common';
import { UratQuestionDto } from './dto';

@Controller('readinesslevel')
export class ReadinesslevelController {
  @Get('/urat-questions')
  getURATQuestions() {
    // TODO: TEMPORARY RANI, SAVE TO DATABASE

    return {
      results: [
        {
          id: 1,
          question:
            'Describe the current stage of your technology development. Has it been validated in a lab or relevant environment?',
          readiness_type_id: 2,
          readiness_type: 'Technology',
        },
        {
          id: 2,
          question:
            "What evidence can you provide of your technology's functionality and feasibility?",
          readiness_type_id: 2,
          readiness_type: 'Technology',
        },
        {
          id: 3,
          question:
            'How does your current technology development align with your product roadmap and market goals?',
          readiness_type_id: 2,
          readiness_type: 'Technology',
        },
        {
          id: 4,
          question: 'Have you identified your target market and customer base?',
          readiness_type_id: 3,
          readiness_type: 'Market',
        },
        {
          id: 5,
          question:
            'What market research have you conducted, and what are the key insights?',
          readiness_type_id: 3,
          readiness_type: 'Market',
        },
        {
          id: 6,
          question:
            'How are you planning to address the market needs and challenges identified in your research?',
          readiness_type_id: 3,
          readiness_type: 'Market',
        },
        {
          id: 7,
          question:
            'Have you received feedback from potential users or stakeholders about your product/service?',
          readiness_type_id: 4,
          readiness_type: 'Acceptance',
        },
        {
          id: 8,
          question:
            'How have you integrated this feedback into your development process?',
          readiness_type_id: 4,
          readiness_type: 'Acceptance',
        },
        {
          id: 9,
          question:
            'What steps have you taken to gauge and build market acceptance for your offering?',
          readiness_type_id: 4,
          readiness_type: 'Acceptance',
        },
        {
          id: 10,
          question:
            'Describe your organizational structure and the roles of your team members.',
          readiness_type_id: 5,
          readiness_type: 'Organizational',
        },
        {
          id: 11,
          question: 'How are internal processes managed within your startup?',
          readiness_type_id: 5,
          readiness_type: 'Organizational',
        },
        {
          id: 12,
          question:
            'What strategies do you have in place for team development and operational efficiency?',
          readiness_type_id: 5,
          readiness_type: 'Organizational',
        },
        {
          id: 13,
          question:
            'Are you aware of the regulatory requirements relevant to your product or service?',
          readiness_type_id: 6,
          readiness_type: 'Regulatory',
        },
        {
          id: 14,
          question:
            'Have you begun planning or implementing compliance strategies?',
          readiness_type_id: 6,
          readiness_type: 'Regulatory',
        },
        {
          id: 15,
          question:
            'How do you manage and stay updated with changes in regulatory requirements?',
          readiness_type_id: 6,
          readiness_type: 'Regulatory',
        },
        {
          id: 16,
          question:
            "What are your startup's funding goals, and what is your plan to achieve them?",
          readiness_type_id: 7,
          readiness_type: 'Investment',
        },
        {
          id: 17,
          question:
            'Have you prepared an investment proposal or pitch for potential investors?',
          readiness_type_id: 7,
          readiness_type: 'Investment',
        },
        {
          id: 18,
          question:
            'What steps have you taken to understand and engage with potential investors?',
          readiness_type_id: 7,
          readiness_type: 'Investment',
        },
      ],
    };
  }

  @Get('/calculator-categories')
  getCalculatorCategories() {
    return {
      results: [
        {
          id: 9,
          category: 'Technology',
          readiness_type_id: 2,
          questions: [
            {
              id: 36,
              question:
                'Project work is beyond basic research and technology concept has been defined',
              score: 1,
              category_id: 9,
            },
            {
              id: 37,
              question:
                'Applied research has begun and practical application(s) have been identified',
              score: 2,
              category_id: 9,
            },
            {
              id: 38,
              question:
                'Preliminary testing of technology components has begun, and technical feasibility has been established in a laboratory environment',
              score: 3,
              category_id: 9,
            },
            {
              id: 39,
              question:
                'Initial testing of integrated product/system has been completed in a laboratory environment',
              score: 4,
              category_id: 9,
            },
            {
              id: 40,
              question:
                'Laboratory scale integrated product/system demonstrates performance in the intended application(s)',
              score: 5,
              category_id: 9,
            },
          ],
        },
        {
          id: 10,
          category: 'Product Development',
          readiness_type_id: 2,
          questions: [
            {
              id: 41,
              question: 'Initial product/market fit has been defined',
              score: 1,
              category_id: 10,
            },
            {
              id: 42,
              question:
                'Pilot scale product/system has been tested in the intended application(s)',
              score: 2,
              category_id: 10,
            },
            {
              id: 43,
              question:
                'Demonstration of a full scale product/system prototype has been completed in the intended application(s)',
              score: 3,
              category_id: 10,
            },
            {
              id: 44,
              question:
                'Actual product/system has been proven to work in its near-final form under a representative set of expected conditions and environments',
              score: 4,
              category_id: 10,
            },
            {
              id: 45,
              question:
                'Product/system is in final form and has been operated under the full range of operating conditions and environments',
              score: 5,
              category_id: 10,
            },
          ],
        },
        {
          id: 11,
          category: 'Product Definition/Design',
          readiness_type_id: 8,
          questions: [
            {
              id: 46,
              question:
                'One or more initial product hypotheses have been defined',
              score: 1,
              category_id: 11,
            },
            {
              id: 47,
              question:
                'Mapping product/system attributes against customer needs has highlighted a clear value proposition',
              score: 2,
              category_id: 11,
            },
            {
              id: 48,
              question:
                'The product/system has been scaled from laboratory to pilot scale and issues that may affect achieving full scale have been identified',
              score: 3,
              category_id: 11,
            },
            {
              id: 49,
              question:
                'Comprehensive customer value proposition model has been developed, including a detailed understanding of product/system design specifications, required certifications, and trade-offs',
              score: 4,
              category_id: 11,
            },
            {
              id: 50,
              question:
                'Product/system final design optimization has been completed, required certifications have been obtained, and product/system has incorporated detailed customer and product requirements',
              score: 5,
              category_id: 11,
            },
          ],
        },
        {
          id: 12,
          category: 'Competitive Landscape',
          readiness_type_id: 8,
          questions: [
            {
              id: 51,
              question:
                'Secondary market research has been performed and basic knowledge of potential applications and competitive landscape have been identified',
              score: 1,
              category_id: 12,
            },
            {
              id: 52,
              question:
                'Primary market research to prove the product/system commercial feasibility has been completed and basic understanding of competitive products/systems has been demonstrated',
              score: 2,
              category_id: 12,
            },
            {
              id: 53,
              question:
                'Comprehensive market research to prove the product/system commercial feasibility has been completed and intermediate understanding of competitive products/systems has been demonstrated',
              score: 3,
              category_id: 12,
            },
            {
              id: 54,
              question:
                'Competitive analysis to illustrate unique features and advantages of the product/system compared to competitive products/systems has been completed',
              score: 4,
              category_id: 12,
            },
            {
              id: 55,
              question:
                'Full and complete understanding of the competitive landscape, target application(s), competitive products/systems, and market has been achieved',
              score: 5,
              category_id: 12,
            },
          ],
        },
        {
          id: 13,
          category: 'Team',
          readiness_type_id: 8,
          questions: [
            {
              id: 56,
              question:
                'No team or company in place (single individual, no legal entity)',
              score: 1,
              category_id: 13,
            },
            {
              id: 57,
              question:
                'Solely technical or non-technical founder(s) running the company with no outside assistance',
              score: 2,
              category_id: 13,
            },
            {
              id: 58,
              question:
                'Solely technical or non-technical founder(s) running the company with assistance from outside advisors/mentors and/or incubator/accelerator',
              score: 3,
              category_id: 13,
            },
            {
              id: 59,
              question:
                'Balanced team with technical and business development/commercialization experience running the company with assistance from outside advisors/mentors',
              score: 4,
              category_id: 13,
            },
            {
              id: 60,
              question:
                'Balanced team with all capabilities onboard (e.g. sales, marketing, customer service, operations, etc.) running the company with assistance from outside advisors/mentors',
              score: 5,
              category_id: 13,
            },
          ],
        },
        {
          id: 14,
          category: 'Go-To-Market',
          readiness_type_id: 8,
          questions: [
            {
              id: 61,
              question:
                'Initial business model and value proposition have been defined',
              score: 1,
              category_id: 14,
            },
            {
              id: 62,
              question:
                'Customers/partners have been interviewed to understand their pain points/needs, and business model and value proposition have been refined based on customer/partner feedback',
              score: 2,
              category_id: 14,
            },
            {
              id: 63,
              question:
                'Market and customer/partner needs and how those translate to product requirements have been defined, and initial relationships have been developed with key stakeholders across the value chain',
              score: 3,
              category_id: 14,
            },
            {
              id: 64,
              question:
                'Partnerships have been formed with key stakeholders across the value chain (e.g. suppliers, partners, service providers, and customers)',
              score: 4,
              category_id: 14,
            },
            {
              id: 65,
              question:
                'Supply agreements with suppliers and partners are in place and initial purchase orders from customers have been received',
              score: 5,
              category_id: 14,
            },
          ],
        },
        {
          id: 15,
          category: 'Manufacturing/Supply Chain',
          readiness_type_id: 8,
          questions: [
            {
              id: 66,
              question:
                'Potential suppliers, partners, and customers have been identified and mapped in an initial value chain analysis',
              score: 1,
              category_id: 15,
            },
            {
              id: 67,
              question:
                'Relationships have been established with potential suppliers, partners, service providers, and customers and they have provided input on product and manufacturability requirements',
              score: 2,
              category_id: 15,
            },
            {
              id: 68,
              question:
                'Manufacturing process qualifications (e.g. QC/QA) have been defined and are in progress',
              score: 3,
              category_id: 15,
            },
            {
              id: 69,
              question:
                'Products/systems have been pilot manufactured and sold to initial customers',
              score: 4,
              category_id: 15,
            },
            {
              id: 70,
              question:
                'Full scale manufacturing and widespread deployment of product/system to customers and/or users has been achieved',
              score: 5,
              category_id: 15,
            },
          ],
        },
      ],
    };
  }

  @Post('/urat-question-answers')
  createUratQuestionAnswers(@Body() dto: UratQuestionDto) {
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log('BULK CREATE URAT QUESTION ANSWERS');
    console.log(dto);
  }

  @Post('/calculator-question-answers')
  createCalculatorQuestionAnswers() {}
}
