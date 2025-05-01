import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  DateTimeType,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { CapsuleProposal } from './capsule-proposal.entity';
import { QualificationStatus } from './enums/qualification-status.enum';

@Entity({ tableName: 'startups' })
export class Startup {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => User)
  user!: User;

  @Enum(() => QualificationStatus)
  qualificationStatus: QualificationStatus = QualificationStatus.PENDING;

  @Property()
  dataPrivacy: boolean = false;

  @Property({ type: 'text', nullable: true })
  links?: string;

  @Property({ length: 100, nullable: true })
  groupName?: string;

  @Property({ length: 100, nullable: true })
  universityName?: string;

  @Property()
  eligibility: boolean = false;

  @OneToOne(() => CapsuleProposal, (capsule) => capsule.startup, {
    nullable: true,
  })
  capsuleProposal?: CapsuleProposal;

  @ManyToMany(() => User)
  mentors = new Collection<User>(this);

  @Property({ type: DateTimeType, nullable: true })
  datetimeDeleted?: Date;
}
