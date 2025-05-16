import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { User } from './user.entity';
import { RnsStatus } from './enums/rns.enum';
import { ReadinessType } from './enums/readiness-type.enum';

@Entity({ tableName: 'rns' })
export class Rns {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  priorityNumber!: number;

  @Property()
  description!: string;

  @Property()
  targetLevel!: number;

  @Property()
  isAiGenerated!: boolean;

  @Enum(() => RnsStatus)
  status: RnsStatus = RnsStatus.New;

  @Enum(() => ReadinessType)
  readinessType!: ReadinessType;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @ManyToOne(() => User)
  user!: User;
}
