import { Migration } from '@mikro-orm/migrations';

export class Migration20250428203552 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "urat_question_answers" drop constraint "urat_question_answers_startup_id_foreign";`,
    );
    this.addSql(
      `alter table "urat_question_answers" drop constraint "urat_question_answers_urat_question_id_foreign";`,
    );

    this.addSql(
      `alter table "urat_question_answers" alter column "startup_id" type int using ("startup_id"::int);`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "startup_id" drop not null;`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "urat_question_id" type int using ("urat_question_id"::int);`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "urat_question_id" drop not null;`,
    );
    this.addSql(
      `alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on delete cascade;`,
    );
    this.addSql(
      `alter table "urat_question_answers" add constraint "urat_question_answers_urat_question_id_foreign" foreign key ("urat_question_id") references "urat_questions" ("id") on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "urat_question_answers" drop constraint "urat_question_answers_startup_id_foreign";`,
    );
    this.addSql(
      `alter table "urat_question_answers" drop constraint "urat_question_answers_urat_question_id_foreign";`,
    );

    this.addSql(
      `alter table "urat_question_answers" alter column "startup_id" type int using ("startup_id"::int);`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "startup_id" set not null;`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "urat_question_id" type int using ("urat_question_id"::int);`,
    );
    this.addSql(
      `alter table "urat_question_answers" alter column "urat_question_id" set not null;`,
    );
    this.addSql(
      `alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "urat_question_answers" add constraint "urat_question_answers_urat_question_id_foreign" foreign key ("urat_question_id") references "urat_questions" ("id") on update cascade;`,
    );
  }
}
