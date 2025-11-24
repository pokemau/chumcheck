"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasePrompt = createBasePrompt;
const startup_readiness_level_entity_1 = require("../../entities/startup-readiness-level.entity");
async function createBasePrompt(startup, em) {
    const capsuleProposalInfo = startup.capsuleProposal;
    if (!capsuleProposalInfo)
        return null;
    const startupReadinessLevels = await em.find(startup_readiness_level_entity_1.StartupReadinessLevel, {
        startup: startup,
    }, {
        populate: ['readinessLevel'],
    });
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
//# sourceMappingURL=prompt.utils.js.map