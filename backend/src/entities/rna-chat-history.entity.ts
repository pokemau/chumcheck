import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { StartupRNA } from './rna.entity';

@Entity()
export class RnaChatHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => StartupRNA, { deleteRule: 'cascade' })
  rna!: StartupRNA;

  @Property()
  role!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, type: 'text' })
  refinedRna?: string;

  constructor(data?: Partial<RnaChatHistory>) {
    if (data) {
      Object.assign(this, data);
    }
  }
} 