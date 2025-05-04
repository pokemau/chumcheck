import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Body, Injectable, Param, Patch } from '@nestjs/common';
import { StartupRNA } from 'src/entities/startup-rnas.entity';
import { Startup } from 'src/entities/startup.entity';
import { CreateStartupRnaDto, UpdateStartupRnaDto  } from './dto/rna.dto';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';

@Injectable()
export class RnaService {
    constructor(private em: EntityManager) {}
    
    async getRNAbyId(startupId: number) {
      return await this.em.find(StartupRNA, { startup: startupId }, {
        populate: ['readinessLevel']
      });
    }  

    async create(dto: CreateStartupRnaDto) {
      if (!dto.readiness_level_id) {
        throw new BadRequestException('readiness_level_id is required');
      }
    
      const readinessRef = this.em.getReference(ReadinessLevel, dto.readiness_level_id);
      const startupRef = this.em.getReference(Startup, dto.startup_id);
    
      const rna = this.em.create(StartupRNA, {
        rna: dto.rna,
        isAiGenerated: dto.isAiGenerated ?? false,
        startup: startupRef,
        readinessLevel: readinessRef,
      });
    
      await this.em.persistAndFlush(rna);
      return rna;
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
