import { Migration } from '@mikro-orm/migrations';

export class Migration20250428205851 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "calculator_question_answers" alter column "startup_id" type int using ("startup_id"::int);`);
    this.addSql(`alter table "calculator_question_answers" alter column "startup_id" set not null;`);
    this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "calculator_question_answers" alter column "startup_id" type int using ("startup_id"::int);`);
    this.addSql(`alter table "calculator_question_answers" alter column "startup_id" drop not null;`);
    this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on delete cascade;`);
  }

}
