import { EntityManager } from '@mikro-orm/postgresql';
export declare class AppService {
    private em;
    constructor(em: EntityManager);
    getHello(): string;
    generateUratQuestions(): Promise<void>;
    generateCalculatorQuestions(): Promise<void>;
    generateReadinessTypes(): Promise<void>;
}
