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
  OneToMany,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { CapsuleProposal } from './capsule-proposal.entity';
import { QualificationStatus } from './enums/qualification-status.enum';
import { Roadblock } from './roadblock.entity';
import { Rns } from './rns.entity';
import { StartupReadinessLevel } from './startup-readiness-level.entity';
import { UratQuestionAnswer } from './urat-question-answer.entity';
import { CalculatorQuestionAnswer } from './calculator-question-answer.entity';
import { StartupWaitlistMessage } from './startup-waitlist-message.entity';

@Entity({ tableName: 'startups' })
export class Startup {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
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

  @OneToMany(() => Roadblock, (roadblock) => roadblock.startup)
  roadblocks = new Collection<Roadblock>(this);

  @ManyToMany(() => User)
  members = new Collection<User>(this);

  @OneToMany(() => Rns, (rns) => rns.startup)
  rns = new Collection<Rns>(this);

  @OneToMany(() => StartupReadinessLevel, (s) => s.startup)
  readinessLevels = new Collection<StartupReadinessLevel>(this);

  @OneToMany(() => UratQuestionAnswer, (answer) => answer.startup)
  uratQuestionAnswers = new Collection<UratQuestionAnswer>(this);

  @OneToMany(() => CalculatorQuestionAnswer, (answer) => answer.startup)
  calculatorQuestionAnswers = new Collection<CalculatorQuestionAnswer>(this);

  @OneToMany(() => StartupWaitlistMessage, (message) => message.startup)
  waitlistMessages = new Collection<StartupWaitlistMessage>(this);
}
