"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const urat_question_entity_1 = require("./entities/urat-question.entity");
const readiness_type_enum_1 = require("./entities/enums/readiness-type.enum");
const calculator_category_enum_1 = require("./entities/enums/calculator-category.enum");
const calculator_question_entity_1 = require("./entities/calculator-question.entity");
const readiness_level_entity_1 = require("./entities/readiness-level.entity");
let AppService = class AppService {
    em;
    constructor(em) {
        this.em = em;
    }
    getHello() {
        return 'This is the Chumcheck API!';
    }
    async generateUratQuestions() {
        const questions = [
            {
                question: 'Describe the current stage of your technology development. Has it been validated in a lab or relevant environment?',
                category: readiness_type_enum_1.ReadinessType.T,
            },
            {
                question: "What evidence can you provide of your technology's functionality and feasibility?",
                category: readiness_type_enum_1.ReadinessType.T,
            },
            {
                question: 'How does your current technology development align with your product roadmap and market goals?',
                category: readiness_type_enum_1.ReadinessType.T,
            },
            {
                question: 'Have you identified your target market and customer base?',
                category: readiness_type_enum_1.ReadinessType.M,
            },
            {
                question: 'What market research have you conducted, and what are the key insights?',
                category: readiness_type_enum_1.ReadinessType.M,
            },
            {
                question: 'How are you planning to address the market needs and challenges identified in your research?',
                category: readiness_type_enum_1.ReadinessType.M,
            },
            {
                question: 'Have you received feedback from potential users or stakeholders about your product/service?',
                category: readiness_type_enum_1.ReadinessType.A,
            },
            {
                question: 'How have you integrated this feedback into your development process?',
                category: readiness_type_enum_1.ReadinessType.A,
            },
            {
                question: 'What steps have you taken to gauge and build market acceptance for your offering?',
                category: readiness_type_enum_1.ReadinessType.A,
            },
            {
                question: 'Describe your organizational structure and the roles of your team members.',
                category: readiness_type_enum_1.ReadinessType.O,
            },
            {
                question: 'How are internal processes managed within your startup?',
                category: readiness_type_enum_1.ReadinessType.O,
            },
            {
                question: 'What strategies do you have in place for team development and operational efficiency?',
                category: readiness_type_enum_1.ReadinessType.O,
            },
            {
                question: 'Are you aware of the regulatory requirements relevant to your product or service?',
                category: readiness_type_enum_1.ReadinessType.R,
            },
            {
                question: 'Have you begun planning or implementing compliance strategies?',
                category: readiness_type_enum_1.ReadinessType.R,
            },
            {
                question: 'How do you manage and stay updated with changes in regulatory requirements?',
                category: readiness_type_enum_1.ReadinessType.R,
            },
            {
                question: "What are your startup's funding goals, and what is your plan to achieve them?",
                category: readiness_type_enum_1.ReadinessType.I,
            },
            {
                question: 'Have you prepared an investment proposal or pitch for potential investors?',
                category: readiness_type_enum_1.ReadinessType.I,
            },
            {
                question: 'What steps have you taken to understand and engage with potential investors?',
                category: readiness_type_enum_1.ReadinessType.I,
            },
        ];
        for (let i = 0; i < questions.length; i++) {
            const q = new urat_question_entity_1.UratQuestion();
            q.question = questions[i].question;
            q.readinessType = questions[i].category;
            await this.em.persistAndFlush(q);
        }
    }
    async generateCalculatorQuestions() {
        const questions = [
            {
                question: 'Project work is beyond basic research and technology concept has been defined',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Technology,
            },
            {
                question: 'Applied research has begun and practical application(s) have been identified',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Technology,
            },
            {
                question: 'Preliminary testing of technology components has begun, and technical feasibility has been established in a laboratory environment',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Technology,
            },
            {
                question: 'Initial testing of integrated product/system has been completed in a laboratory environment',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Technology,
            },
            {
                question: 'Laboratory scale integrated product/system demonstrates performance in the intended application(s)',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Technology,
            },
            {
                question: 'Initial product/market fit has been defined',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Product_Development,
            },
            {
                question: 'Pilot scale product/system has been tested in the intended application(s)',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Product_Development,
            },
            {
                question: 'Demonstration of a full scale product/system prototype has been completed in the intended application(s)',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Product_Development,
            },
            {
                question: 'Actual product/system has been proven to work in its near-final form under a representative set of expected conditions and environments',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Product_Development,
            },
            {
                question: 'Product/system is in final form and has been operated under the full range of operating conditions and environments',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Product_Development,
            },
            {
                question: 'One or more initial product hypotheses have been defined',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Product_Definition_Design,
            },
            {
                question: 'Mapping product/system attributes against customer needs has highlighted a clear value proposition',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Product_Definition_Design,
            },
            {
                question: 'The product/system has been scaled from laboratory to pilot scale and issues that may affect achieving full scale have been identified',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Product_Definition_Design,
            },
            {
                question: 'Comprehensive customer value proposition model has been developed, including a detailed understanding of product/system design specifications, required certifications, and trade-offs',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Product_Definition_Design,
            },
            {
                question: 'Product/system final design optimization has been completed, required certifications have been obtained, and product/system has incorporated detailed customer and product requirements',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Product_Definition_Design,
            },
            {
                question: 'Secondary market research has been performed and basic knowledge of potential applications and competitive landscape have been identified',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Competitive_Landscape,
            },
            {
                question: 'Primary market research to prove the product/system commercial feasibility has been completed and basic understanding of competitive products/systems has been demonstrated',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Competitive_Landscape,
            },
            {
                question: 'Comprehensive market research to prove the product/system commercial feasibility has been completed and intermediate understanding of competitive products/systems has been demonstrated',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Competitive_Landscape,
            },
            {
                question: 'Competitive analysis to illustrate unique features and advantages of the product/system compared to competitive products/systems has been completed',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Competitive_Landscape,
            },
            {
                question: 'Full and complete understanding of the competitive landscape, target application(s), competitive products/systems, and market has been achieved',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Competitive_Landscape,
            },
            {
                question: 'No team or company in place (single individual, no legal entity)',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Team,
            },
            {
                question: 'Solely technical or non-technical founder(s) running the company with no outside assistance',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Team,
            },
            {
                question: 'Solely technical or non-technical founder(s) running the company with assistance from outside advisors/mentors and/or incubator/accelerator',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Team,
            },
            {
                question: 'Balanced team with technical and business development/commercialization experience running the company with assistance from outside advisors/mentors',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Team,
            },
            {
                question: 'Balanced team with all capabilities onboard (e.g. sales, marketing, customer service, operations, etc.) running the company with assistance from outside advisors/mentors',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Team,
            },
            {
                question: 'Initial business model and value proposition have been defined',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Go_To_Market,
            },
            {
                question: 'Customers/partners have been interviewed to understand their pain points/needs, and business model and value proposition have been refined based on customer/partner feedback',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Go_To_Market,
            },
            {
                question: 'Market and customer/partner needs and how those translate to product requirements have been defined, and initial relationships have been developed with key stakeholders across the value chain',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Go_To_Market,
            },
            {
                question: 'Partnerships have been formed with key stakeholders across the value chain (e.g. suppliers, partners, service providers, and customers)',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Go_To_Market,
            },
            {
                question: 'Supply agreements with suppliers and partners are in place and initial purchase orders from customers have been received',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Go_To_Market,
            },
            {
                question: 'Potential suppliers, partners, and customers have been identified and mapped in an initial value chain analysis',
                score: 1,
                category: calculator_category_enum_1.CalculatorCategory.Manufacturing_Supply_Chain,
            },
            {
                question: 'Relationships have been established with potential suppliers, partners, service providers, and customers and they have provided input on product and manufacturability requirements',
                score: 2,
                category: calculator_category_enum_1.CalculatorCategory.Manufacturing_Supply_Chain,
            },
            {
                question: 'Manufacturing process qualifications (e.g. QC/QA) have been defined and are in progress',
                score: 3,
                category: calculator_category_enum_1.CalculatorCategory.Manufacturing_Supply_Chain,
            },
            {
                question: 'Products/systems have been pilot manufactured and sold to initial customers',
                score: 4,
                category: calculator_category_enum_1.CalculatorCategory.Manufacturing_Supply_Chain,
            },
            {
                question: 'Full scale manufacturing and widespread deployment of product/system to customers and/or users has been achieved',
                score: 5,
                category: calculator_category_enum_1.CalculatorCategory.Manufacturing_Supply_Chain,
            },
        ];
        for (let i = 0; i < questions.length; i++) {
            const q = new calculator_question_entity_1.CalculatorQuestion();
            q.question = questions[i].question;
            q.score = questions[i].score;
            q.category = questions[i].category;
            await this.em.persistAndFlush(q);
        }
    }
    async generateReadinessTypes() {
        const entries = [
            { level: 1, name: 'Basic Principle', readinessType: readiness_type_enum_1.ReadinessType.T },
            {
                level: 2,
                name: 'Technology Concept Formulation',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 3,
                name: 'Experimental Proof of Concept',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 4,
                name: 'Technology Validation in Lab',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 5,
                name: 'Technology Demonstration in Relevant Environment',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 6,
                name: 'System Prototype Demonstration in Operational Environment',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 7,
                name: 'System Prototype Demonstration in Operational Environment',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 8,
                name: 'Actual System Completed and Qualified',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 9,
                name: 'Actual System Proven Through Successful Mission Operations',
                readinessType: readiness_type_enum_1.ReadinessType.T,
            },
            {
                level: 1,
                name: 'Market Research Initiated',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 2,
                name: 'Market Hypothesis Formulated',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 3,
                name: 'Preliminary Market Strategy Developed',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 4,
                name: 'Market Strategy Refined and Tested',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 5,
                name: 'Full Market Strategy and Go-to-Market Plan Developed',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 6,
                name: 'Market Testing and Validation Completed',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 7,
                name: 'Market Entry and Initial Sales',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 8,
                name: 'Market Expansion and Scaling',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 9,
                name: 'Market Leadership and Continuous Innovation',
                readinessType: readiness_type_enum_1.ReadinessType.M,
            },
            {
                level: 1,
                name: 'Initial Concept Acceptance',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 2,
                name: 'Feedback-Driven Concept Refinement',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 3,
                name: 'Initial Prototype and Stakeholder Interaction',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 4,
                name: 'Market Testing and Initial Customer Feedback',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 5,
                name: 'Refinement Based on Market Feedback',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 6,
                name: 'Widespread Market Engagement and Feedback Analysis',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 7,
                name: 'Market Penetration and Consumer Advocacy',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 8,
                name: 'Market Expansion and Sustainability',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 9,
                name: 'Established Market Leadership and Continuous Innovation',
                readinessType: readiness_type_enum_1.ReadinessType.A,
            },
            {
                level: 1,
                name: 'Foundational Planning and Structure',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 2,
                name: 'Initial Capability Building',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 3,
                name: 'Operational Efficiency and Team Development',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 4,
                name: 'Strategic Development and Market Alignment',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 5,
                name: 'Market Readiness and Operational Scaling',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 6,
                name: 'Advanced Operational Management and Efficiency',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 7,
                name: 'Comprehensive Market Integration and Growth Strategies',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 8,
                name: 'Leadership Development and Organizational Culture Strengthening',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 9,
                name: 'Organizational Maturity and Market Leadership',
                readinessType: readiness_type_enum_1.ReadinessType.O,
            },
            {
                level: 1,
                name: 'Initial Regulatory Awareness',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 2,
                name: 'Regulatory Requirements Analysis',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 3,
                name: 'Initial Compliance and Documentation',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 4,
                name: 'Comprehensive Compliance and Internal Auditing',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 5,
                name: 'Regulatory Engagement and External Certification',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 6,
                name: 'Advanced Regulatory Strategy and Global Compliance',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 7,
                name: 'Proactive Regulatory Leadership and Innovation',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 8,
                name: 'Regulatory Compliance Optimization and International Standards',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 9,
                name: 'Global Regulatory Leadership and Advocacy',
                readinessType: readiness_type_enum_1.ReadinessType.R,
            },
            {
                level: 1,
                name: 'Initial Investment Conceptualization',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 2,
                name: 'Investment Planning and Structuring',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 3,
                name: 'Investor Engagement and Pitching',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 4,
                name: 'Investment Documentation and Legal Preparedness',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 5,
                name: 'Investor Outreach and Initial Meetings',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 6,
                name: 'Investment Negotiations and Deal Structuring',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 7,
                name: 'Finalizing Investment and Post-Investment Planning',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 8,
                name: 'Investment Growth and Expansion',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
            {
                level: 9,
                name: 'Investment Maturity and Market Leadership',
                readinessType: readiness_type_enum_1.ReadinessType.I,
            },
        ];
        for (let i = 0; i < entries.length; i++) {
            const r = new readiness_level_entity_1.ReadinessLevel();
            r.level = entries[i].level;
            r.name = entries[i].name;
            r.readinessType = entries[i].readinessType;
            await this.em.persistAndFlush(r);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], AppService);
//# sourceMappingURL=app.service.js.map