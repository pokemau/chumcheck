import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';
import { User } from './user.entity';

@Entity({ tableName: 'startup_waitlist_messages' })
export class StartupWaitlistMessage {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Startup, { deleteRule: 'cascade' })
  startup!: Startup;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  manager!: User;

  @Property({ type: 'text' })
  message!: string;

  @Property({ type: 'date', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
