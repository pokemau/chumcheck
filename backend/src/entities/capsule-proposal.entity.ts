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

  @Property({ type: 'text' })
  objectives!: string;

  @Property({ type: 'text' })
  scope!: string;

  @Property({ type: 'text' })
  methodology!: string;

  @Property({ nullable: true })
  fileName?: string;

  @OneToOne(() => Startup, (startup) => startup.capsuleProposal, {
    owner: true,
  })
  startup!: Startup;
}
