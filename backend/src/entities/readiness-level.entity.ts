import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';
import { LevelCriterion } from './level-criterion.entity';

@Entity({ tableName: 'readiness_levels' })
export class ReadinessLevel {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  level!:number; 

  @Property()
  name!: string;

  @Enum(() => ReadinessType)
  readinessType!: ReadinessType;

  @OneToMany(() => LevelCriterion, criterion => criterion.readinessLevel)
  criteria = new Collection<LevelCriterion>(this);
}
