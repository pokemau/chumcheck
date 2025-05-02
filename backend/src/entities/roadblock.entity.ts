import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Status } from './enums/status.enum';
import { User } from './user.entity';
import { Startup } from './startup.entity';

@Entity({ tableName: 'roadblocks' })
export class Roadblock {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  riskNumber!: number;

  @Property()
  description!: string;

  @Property()
  fix!: string;

  @Enum(() => Status)
  status!: Status;

  @ManyToOne(() => User)
  assignee!: User;

  @ManyToOne(() => Startup)
  startup!: Startup;

  @Property()
  isAiGenerated!: boolean;
}
