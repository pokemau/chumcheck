import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'activity_logs' })
export class ActivityLog {
  @PrimaryKey()
  id!: number;

  @Property()
  action!: string; // e.g., 'Admin' | 'User' | 'System'

  @Property()
  details!: string;

  @Property({ nullable: true })
  actor?: string; // email or name of the initiator

  @Property({ type: 'date' })
  createdAt: Date = new Date();
}
