import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { User } from './user.entity';
import { RnsStatus } from './enums/rns.enum';
import { ReadinessType } from './enums/readiness-type.enum';
import { ReadinessLevel } from './readiness-level.entity';
import { getReadinessLevels } from '../utils';

@Entity({ tableName: 'rns' })
export class Rns {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  priorityNumber!: number;

  @Property()
  clickedByMentor: boolean = false;

  @Property()
  clickedByStartup: boolean = false;

  @Property({ type: 'text' })
  description!: string;

  @ManyToOne(() => ReadinessLevel)
  targetLevel!: ReadinessLevel;

  @Property()
  isAiGenerated: boolean = false;

  @Enum(() => RnsStatus)
  status: RnsStatus = RnsStatus.New;

  @Enum(() => RnsStatus)
  requestedStatus?: RnsStatus;

  @Property({ default: 'Unchanged' })
  approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';

  @Enum(() => ReadinessType)
  readinessType!: ReadinessType;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @ManyToOne(() => User)
  assignee!: User;

  getTargetLevelScore(): number {
    const levels = getReadinessLevels(this.readinessType);

    const matchingLevels = levels.filter(
      (level: any) => Number(level.id) === Number(this.targetLevel.id),
    );

    return matchingLevels.length > 0 ? Number(matchingLevels[0].level) : -1;
  }
}
