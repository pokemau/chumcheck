import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
} from '@mikro-orm/core';
import { Rns } from './rns.entity';

@Entity()
export class RnsChatHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Rns)
  rns!: Rns;

  @Property()
  role!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, type: 'text' })
  refinedDescription?: string;

  constructor(data?: Partial<RnsChatHistory>) {
    if (data) {
      Object.assign(this, data);
    }
  }
} 