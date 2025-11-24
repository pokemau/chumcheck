import { Startup } from 'src/entities/startup.entity';
import { EntityManager } from '@mikro-orm/core';
export declare function createBasePrompt(startup: Startup, em: EntityManager): Promise<string | null>;
