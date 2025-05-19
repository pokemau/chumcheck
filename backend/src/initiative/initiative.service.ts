import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Initiative } from 'src/entities/initiative.entity';

@Injectable()
export class InitiativeService {
    constructor(private readonly em: EntityManager) {}

    async getStartupInitiative(startupId: number): Promise<Initiative[]> {
        return this.em.find(Initiative, { startup: startupId }, { orderBy: { id: 'ASC' } });
    }
}
