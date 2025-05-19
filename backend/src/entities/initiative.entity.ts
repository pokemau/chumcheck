import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Enum,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Startup } from './startup.entity';
import { Rns } from './rns.entity';
import { RnsStatus } from './enums/rns.enum'; // you'll need to define this

@Entity({ tableName: 'initiatives' })
export class Initiative {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  initiativeNumber!: number;

  @Enum(() => RnsStatus)
  status!: RnsStatus;

  @ManyToOne(() => Rns)
  rns!: Rns;

  @Property()
  isAiGenerated!: boolean;

  @ManyToOne(() => User)
  assignee!: User;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  measures!: string;

  @Property({ type: 'text' })
  targets!: string;

  @Property({ type: 'text' })
  remarks!: string;

  @Property({ fieldName: 'datetime_created' })
  createdAt!: Date;

  @Property({ fieldName: 'datetime_updated', onUpdate: () => new Date() })
  updatedAt!: Date;
}
