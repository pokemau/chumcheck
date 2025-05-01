import { Migration } from '@mikro-orm/migrations';

export class Migration20250428202209 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "urat_question_answers" ("id" serial primary key, "response" varchar(255) not null, "score" int not null default 1, "startup_id" int not null, "urat_question_id" int not null);`);

    this.addSql(`alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    this.addSql(`alter table "urat_question_answers" add constraint "urat_question_answers_urat_question_id_foreign" foreign key ("urat_question_id") references "urat_questions" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "urat_question_answers" cascade;`);
  }

}
