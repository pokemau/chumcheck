import { Migration } from '@mikro-orm/migrations';

export class Migration20250501045227 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "level_criteria" ("id" serial primary key, "criteria" varchar(255) not null, "excellent_description" varchar(255) not null, "good_description" varchar(255) not null, "fair_description" varchar(255) not null, "poor_description" varchar(255) not null, "very_poor_description" varchar(255) not null, "readiness_level_id" int not null);`);

    this.addSql(`alter table "level_criteria" add constraint "level_criteria_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "level_criteria" cascade;`);
  }

}
