import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
  } from '@mikro-orm/core';
import { ReadinessLevel } from './readiness-level.entity';
import { Startup } from './startup.entity';

  @Entity({ tableName: 'rna' })
  export class StartupRNA {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => ReadinessLevel, {
      fieldName: 'readiness_level_id',
    })
    readinessLevel!: ReadinessLevel;

    @ManyToOne(() => Startup, {
      fieldName: 'startup_id',
      deleteRule: 'cascade',
    })
    startup!: Startup;

    @Property({ fieldName: 'is_ai_generated', type: 'boolean' })
    isAiGenerated!: boolean;

    @Property({ type: 'text' })
    rna!: string;

    @Property({ fieldName: 'created_at' })
    createdAt?: Date = new Date();

    @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
    updatedAt?: Date = new Date();
  }
