import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';
import { ReadinessLevel } from './readiness_level.entity';

@Entity({ tableName: 'level_criteria' })
export class LevelCriterion {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  criteria!: string;

  @Property()
  excellent_description!: string;

  @Property()
  good_description!: string;

  @Property()
  fair_description!: string;

  @Property()
  poor_description!: string;

  @Property()
  very_poor_description!: string;

  @ManyToOne(() => ReadinessLevel)
  readinessLevel!: ReadinessLevel;
}
