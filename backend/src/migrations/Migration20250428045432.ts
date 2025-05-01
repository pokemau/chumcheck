import { Migration } from '@mikro-orm/migrations';

export class Migration20250428045432 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "calculator_question_answers" ("id" serial primary key);`);

    this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);

    this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing/Supply Chain'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "calculator_question_answers" cascade;`);

    this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);

    this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`);
  }

}
