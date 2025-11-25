import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { LevelCriterion } from './level-criterion.entity';

@Entity({ tableName: 'startups_criterion_answers' })
@Unique({ properties: ['startup', 'criterion'] }) // Composite Unique Constraint
export class StartupCriterionAnswer {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  score!: number;

  @Property({ type: 'text', nullable: true })
  remark?: string;

  @ManyToOne(() => LevelCriterion)
  criterion!: LevelCriterion;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
