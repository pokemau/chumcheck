import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';

@Entity({ tableName: 'readinesslevels' })
export class ReadinessLevel {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  level!:number; 

  @Property()
  name!: string;

  @Enum(() => ReadinessType)
  readinessType!: ReadinessType;
}
