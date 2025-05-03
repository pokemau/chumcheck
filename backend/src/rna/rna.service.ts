import { EntityManager } from '@mikro-orm/core';
import { Body, Injectable, Param, Patch } from '@nestjs/common';
import { StartupRNA } from 'src/entities/startup-rnas.entity';
import { Startup } from 'src/entities/startup.entity';
import { UpdateStartupRnaDto } from './dto/rna.dto';

@Injectable()
export class RnaService {
    constructor(private em: EntityManager) {}
    
    async getRNAbyId(startupId: number) {
      return await this.em.find(StartupRNA, { startup: startupId }, {
        populate: ['readinessLevel']
      });
    }  

    async update(id: number, dto: UpdateStartupRnaDto) {
      const rna = await this.em.findOneOrFail(StartupRNA, { id });
    
      if (dto.rna !== undefined) {
        rna.rna = dto.rna;
      }
    
      await this.em.flush();
      return rna;
    }
}
