import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { Rns } from 'src/entities/rns.entity';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { StartupRNA } from 'src/entities/startup-rnas.entity';
import { Startup } from 'src/entities/startup.entity';

@Injectable()
export class ProgressService {
  constructor(private em: EntityManager) {}

  async getProgressReport(startupId: number) {
    const startup = await this.em.findOne(Startup, { id: startupId });

    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startup} does not exist!`);
    }

    const readinessLevels = await this.em.find(
      StartupReadinessLevel,
      { startup: { id: startupId } },
      {
        populate: ['readinessLevel'],
      },
    );

    const rna = await this.em.find(
      StartupRNA,
      { startup: { id: startupId } },
      {
        populate: ['readinessLevel'],
      },
    );

    const rns = await this.em.find(
      Rns,
      {
        startup: { id: startupId },
      },
      {
        populate: ['targetLevel', 'assignee'],
        orderBy: { priorityNumber: 'ASC' },
      },
    );

    return {
      startup,
      readinessLevels: readinessLevels.map((srl) => ({
        id: srl.id,
        readinessLevelId: srl.readinessLevel.id,
        readinessType: srl.readinessLevel.readinessType,
        level: srl.readinessLevel.level,
        name: srl.readinessLevel.name,
        remark: srl.remark,
        createdAt: srl.createdAt,
        updatedAt: srl.updatedAt,
      })),
      rna: rna.map((r) => ({
        id: r.id,
        readinessLevelId: r.readinessLevel.id,
        readinessType: r.readinessLevel.readinessType,
        readinessLevel: {
          id: r.readinessLevel.id,
          level: r.readinessLevel.level,
          name: r.readinessLevel.name,
        },
        isAiGenerated: r.isAiGenerated,
        rna: r.rna,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
      rns: rns.map((r) => ({
        id: r.id,
        description: r.description,
        status: r.status,
        readinessType: r.readinessType,
        targetLevelId: r.targetLevel.id,
        targetLevelScore: r.getTargetLevelScore(),
        priorityNumber: r.priorityNumber,
        isAiGenerated: r.isAiGenerated,
        assignee: r.assignee
          ? {
              id: r.assignee.id,
              firstName: r.assignee.firstName,
              lastName: r.assignee.lastName,
            }
          : null,
      })),
    };
  }
}
