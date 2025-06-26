import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from './user.entity';
import { Startup } from './startup.entity';
import { RnsStatus } from './enums/rns.enum';

@Entity({ tableName: 'roadblocks' })
export class Roadblock {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => User)
  assignee!: User;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @Property()
  isAiGenerated!: boolean;

  @Enum(() => RnsStatus)
  status!: RnsStatus;

  @Enum(() => RnsStatus)
  requestedStatus?: RnsStatus;

  @Property({ default: 'Unchanged' })
  approvalStatus: 'Pending' | 'Approved' | 'Denied' | 'Unchanged';

  @Property()
  riskNumber!: number;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  fix!: string;

  @Property({ fieldName: 'datetime_created', onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ fieldName: 'datetime_updated', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  clickedByMentor: boolean = false;

  @Property()
  clickedByStartup: boolean = false;
}
