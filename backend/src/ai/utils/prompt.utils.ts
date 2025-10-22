import { Startup } from 'src/entities/startup.entity';
import { Rns } from 'src/entities/rns.entity';
import { StartupReadinessLevel } from 'src/entities/startup-readiness-level.entity';
import { EntityManager } from '@mikro-orm/core';

export async function createBasePrompt(
  startup: Startup,
  em: EntityManager,
): Promise<string | null> {
  const capsuleProposalInfo = startup.capsuleProposal;
  if (!capsuleProposalInfo) return null;

  const startupReadinessLevels = await em.find(
    StartupReadinessLevel,
    {
      startup: startup,
    },
    {
      populate: ['readinessLevel'],
    },
  );

  const trl = startupReadinessLevels[0].readinessLevel.level;
  const mrl = startupReadinessLevels[1].readinessLevel.level;
  const arl = startupReadinessLevels[2].readinessLevel.level;
  const orl = startupReadinessLevels[3].readinessLevel.level;
  const rrl = startupReadinessLevels[4].readinessLevel.level;
  const irl = startupReadinessLevels[5].readinessLevel.level;

  return `
    Given these data:
    Acceleration Proposal Title: ${capsuleProposalInfo.title}
    Duration: 3 months
    I. About the startup
    A. Startup Description
    ${capsuleProposalInfo.description}
    B. Problem Statement
    ${capsuleProposalInfo.problemStatement}
    C. Target Market
    ${capsuleProposalInfo.targetMarket}
    D. Solution Description
    ${capsuleProposalInfo.solutionDescription}
    II. About the Proposed Acceleration
    A. Objectives
    ${capsuleProposalInfo.objectives}
    B. Scope of The Proposal
    ${capsuleProposalInfo.scope}
    C. Methodology and Expected Outputs
    ${capsuleProposalInfo.methodology}
    Initial Readiness Level:
    TRL ${trl}
    MRL ${mrl}
    ARL ${arl}
    ORL ${orl}
    RRL ${rrl}
    IRL ${irl}
`;
}
