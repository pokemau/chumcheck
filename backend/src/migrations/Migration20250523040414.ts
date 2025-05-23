import { Migration } from '@mikro-orm/migrations';

export class Migration20250523040414 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "scoring_guide" ("id" serial primary key, "start_range" int not null, "end_range" int not null, "readiness_level_id" int not null, "description" text not null);`);

    this.addSql(`alter table "scoring_guide" add constraint "scoring_guide_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "scoring_guide" cascade;`);
  }

}
