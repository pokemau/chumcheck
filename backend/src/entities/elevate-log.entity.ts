import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { ReadinessType } from './enums/readiness-type.enum';
import { ReadinessLevel } from './readiness-level.entity';

@Entity({ tableName: 'elevate_logs' })
export class ElevateLogs {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property()
  level!: number;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @ManyToOne(() => ReadinessLevel)
  readinessLevel!: ReadinessLevel;
}

