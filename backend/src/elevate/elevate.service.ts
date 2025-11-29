import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ElevateStartupDto } from './dto';
import { Startup } from 'src/entities/startup.entity';
import { ElevateLogs } from 'src/entities/elevate-log.entity';
import { ReadinessLevel } from 'src/entities/readiness-level.entity';

@Injectable()
export class ElevateService {
  constructor(private em: EntityManager) {}

  async elevate(dto: ElevateStartupDto) {
    const startup = await this.em.findOneOrFail(Startup, dto.startupId);
    const readinessLevel = await this.em.findOneOrFail(
      ReadinessLevel,
      dto.readinessLevelId,
    );
    const log = new ElevateLogs();
    log.startup = startup;
    log.readinessLevel = readinessLevel;
    log.level = readinessLevel.level;
    this.em.persist(log);
    return await this.em.flush();
  }

  async getStartupElevateLogs(startupId: number) {
    const logs = await this.em.find(
      ElevateLogs,
      { startup: startupId },
      {
        orderBy: { createdAt: 'desc' },
        limit: 6,
        populate: ['readinessLevel'],
      },
    );

    return logs.sort((a, b) =>
      a.readinessLevel.readinessType.localeCompare(
        b.readinessLevel.readinessType,
      ),
    );
  }
}
