import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Role } from './enums/role.enum';
import { Startup } from './startup.entity';
import { Roadblock } from './roadblock.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true })
  hash!: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Enum(() => Role)
  role: Role = Role.Startup;

  @OneToMany(() => Roadblock, (roadblock) => roadblock.assignee)
  assignedRoadblocks = new Collection<Roadblock>(this);

  @OneToMany(() => Startup, (startup) => startup.user)
  startups = new Collection<Startup>(this);
}
