import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
  } from '@mikro-orm/core';
  import { Startup } from './startup.entity';
  import { ReadinessLevel } from './readiness-level.entity';
  
  @Entity({ tableName: 'startups_readiness_level' })
  export class StartupReadinessLevel {
    @PrimaryKey({ autoincrement: true })
    id!: number;
  
    @ManyToOne(() => ReadinessLevel)
    readinessLevel!: ReadinessLevel;
  
    @ManyToOne(() => Startup)
    startup!: Startup;
  
    @Property({ type: 'text', nullable: true })
    remark?: string;
  
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
  }
  