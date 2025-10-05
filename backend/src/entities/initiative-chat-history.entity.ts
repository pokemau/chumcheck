import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Initiative } from './initiative.entity';

@Entity()
export class InitiativeChatHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Initiative, { deleteRule: 'cascade' })
  initiative!: Initiative;

  @Property()
  role!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, type: 'text' })
  refinedDescription?: string;

  @Property({ nullable: true, type: 'text' })
  refinedMeasures?: string;

  @Property({ nullable: true, type: 'text' })
  refinedTargets?: string;

  @Property({ nullable: true, type: 'text' })
  refinedRemarks?: string;

  constructor(data?: Partial<InitiativeChatHistory>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
