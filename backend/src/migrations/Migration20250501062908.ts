import { Migration } from '@mikro-orm/migrations';

export class Migration20250501062908 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "startups_criterion_answers" ("id" serial primary key, "score" int not null, "remark" text null, "criterion_id" int not null, "startup_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_criterion_id_unique" unique ("startup_id", "criterion_id");`);

    this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_criterion_id_foreign" foreign key ("criterion_id") references "level_criteria" ("id") on update cascade;`);
    this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startups_criterion_answers" cascade;`);
  }

}
