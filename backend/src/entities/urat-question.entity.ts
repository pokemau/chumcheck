import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { ReadinessType } from './enums/readiness-type.enum';

@Entity({ tableName: 'urat_questions' })
export class UratQuestion {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  question!: string;

  @Enum(() => ReadinessType)
  readinessType!: ReadinessType;
}
