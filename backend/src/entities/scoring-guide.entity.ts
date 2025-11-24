import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessLevel } from './readiness-level.entity';

@Entity({ tableName: 'scoring_guide' })
export class ScoringGuide {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => ReadinessLevel)
  readinessLevel!: ReadinessLevel;

  @Property({ type: 'text' })
  description!: string;
}
