import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';

@Entity({ tableName: 'level_criteria' })
export class LevelCriterion {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  criteria!: string;

  @Property()
  level!:number; 

  @Property()
  name!: string;
}
