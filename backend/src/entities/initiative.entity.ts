import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from './user.entity';
import { Startup } from './startup.entity';
import { Rns } from './rns.entity';
import { RnsStatus } from './enums/rns.enum';

@Entity({ tableName: 'initiatives' })
export class Initiative {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  priorityNumber!: number;

  @Property()
  initiativeNumber!: number;

  @Property()
  clickedByMentor: boolean = false;

  @Property()
  clickedByStartup: boolean = false;

  @Enum(() => RnsStatus)
  status!: RnsStatus;

  @Enum(() => RnsStatus)
  requestedStatus?: RnsStatus;

  @Property({ default: 'Unchanged' })
  approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';

  @ManyToOne(() => Rns, { deleteRule: 'cascade' })
  rns!: Rns;

  @Property()
  isAiGenerated!: boolean;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  assignee!: User;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  measures!: string;

  @Property({ type: 'text' })
  targets!: string;

  @Property({ type: 'text' })
  remarks!: string;

  @Property({ fieldName: 'datetime_created', onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ fieldName: 'datetime_updated', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
