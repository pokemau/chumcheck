import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';

@Entity({ tableName: 'capsule_proposals' })
export class CapsuleProposal {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  problemStatement!: string;

  @Property()
  targetMarket!: string;

  @Property()
  solutionDescription!: string;

  @Property()
  objectives!: string;

  @Property()
  scope!: string;

  @Property()
  methodology!: string;

  @OneToOne(() => Startup, (startup) => startup.capsuleProposal, {
    owner: true,
  })
  startup!: Startup;
}
