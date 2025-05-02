import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RnaService {
    constructor(private em: EntityManager) {}
    
  async getRNAbyId(startupId: number) {
    return await this.em.findOne(Startup, { id: startupId });
  }
}
