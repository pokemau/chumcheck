import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadinessType } from 'src/entities/enums/readiness-type.enum';
import { Initiative } from 'src/entities/initiative.entity';
import { Rns } from 'src/entities/rns.entity';
import { Roadblock } from 'src/entities/roadblock.entity';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { StartupRNA } from 'src/entities/rna.entity';
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

    const rnsWithInitiatives = await Promise.all(
      rns.map(async (r) => {
        const initiatives = await this.em.find(
          Initiative,
          { rns: { id: r.id } },
          {
            populate: ['assignee'],
            orderBy: { initiativeNumber: 'ASC' },
          },
        );

        return {
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
          initiatives: initiatives.map((initiative) => ({
            id: initiative.id,
            initiativeNumber: initiative.initiativeNumber,
            status: initiative.status,
            isAiGenerated: initiative.isAiGenerated,
            measures: initiative.measures,
            targets: initiative.targets,
            description: initiative.description,
            assignee: initiative.assignee
              ? {
                  id: initiative.assignee.id,
                  firstName: initiative.assignee.firstName,
                  lastName: initiative.assignee.lastName,
                }
              : null,
          })),
        };
      }),
    );

    const roadblocks = await this.em.find(
      Roadblock,
      { startup: { id: startupId } },
      {
        populate: ['assignee'],
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
      rns: rnsWithInitiatives,
      roadblocks: roadblocks.map((rb) => ({
        id: rb.id,
        description: rb.description,
        fix: rb.fix,
        status: rb.status,
        riskNumber: rb.riskNumber,
        isAiGenerated: rb.isAiGenerated,
        assignee: rb.assignee
          ? {
              id: rb.assignee.id,
              firstName: rb.assignee.firstName,
              lastName: rb.assignee.lastName,
            }
          : null,
        createdAt: rb.createdAt,
        updatedAt: rb.updatedAt,
      })),
    };
  }

  async getInitiavesByns(rnsId: number) {
    const rns = await this.em.findOne(Rns, { id: rnsId });

    if (!rns) {
      throw new NotFoundException(`RNS with ID ${rnsId} does not exist!`);
    }

    const initiatives = await this.em.find(
      Initiative,
      { rns: { id: rnsId } },
      {
        populate: ['assignee', 'startup'],
        orderBy: { initiativeNumber: 'ASC' },
      },
    );

    return initiatives.map((initiative) => ({
      id: initiative.id,
      initiativeNumber: initiative.initiativeNumber,
      status: initiative.status,
      isAiGenerated: initiative.isAiGenerated,
      description: initiative.description,
      measures: initiative.measures,
      targets: initiative.targets,
      remarks: initiative.remarks,
      startup: {
        id: initiative.startup.id,
        name: initiative.startup.name,
      },
      assignee: initiative.assignee
        ? {
            id: initiative.assignee.id,
            firstName: initiative.assignee.firstName,
            lastName: initiative.assignee.lastName,
          }
        : null,
      createdAt: initiative.createdAt,
      updatedAt: initiative.updatedAt,
    }));
  }
}
