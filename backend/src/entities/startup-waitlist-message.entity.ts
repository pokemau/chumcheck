import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Startup } from './startup.entity';

@Entity({ tableName: 'startup_waitlist_messages' })
export class StartupWaitlistMessage {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @Property({ type: 'text' })
  message!: string;

  @Property({ type: 'date', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
