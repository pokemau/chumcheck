import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';

@Entity({ tableName: 'capsule_proposals' })
export class CapsuleProposal {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  problemStatement!: string;

  @Property({ type: 'text' })
  targetMarket!: string;

  @Property({ type: 'text' })
  solutionDescription!: string;

  @Property({ type: 'json' })
  objectives!: string[];

  @Property({ type: 'json' })
  historicalTimeline!: { monthYear: string; description: string }[];

  @Property({ type: 'json' })
  competitiveAdvantageAnalysis!: {
    competitorName: string;
    offer: string;
    pricingStrategy: string;
  }[];

  @Property({ type: 'json' })
  members?: { name: string; role: string }[];

  @Property({ type: 'text' })
  intellectualPropertyStatus!: string;

  @Property({ type: 'text', nullable: true })
  curriculumVitae?: string;

  @Property({ type: 'text' })
  scope!: string;

  @Property({ type: 'text' })
  methodology!: string;

  @Property({ type: 'text' })
  aiAnalysisSummary!: string;

  @OneToOne(() => Startup, (startup) => startup.capsuleProposal, {
    owner: true,
  })
  startup!: Startup;
}
