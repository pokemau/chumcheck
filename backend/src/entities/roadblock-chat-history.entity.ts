import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Roadblock } from './roadblock.entity';

@Entity()
export class RoadblockChatHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Roadblock, { deleteRule: 'cascade' })
  roadblock!: Roadblock;

  @Property()
  role!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, type: 'text' })
  refinedDescription?: string;

  @Property({ nullable: true, type: 'text' })
  refinedFix?: string;

  constructor(data?: Partial<RoadblockChatHistory>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
