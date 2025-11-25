import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { ReadinessLevel } from './readiness-level.entity';

@Entity({ tableName: 'elevate_logs' })
export class ElevateLogs {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property()
  level!: number;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @ManyToOne(() => ReadinessLevel)
  readinessLevel!: ReadinessLevel;
}
