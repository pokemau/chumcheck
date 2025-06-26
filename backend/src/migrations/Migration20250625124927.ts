import { Migration } from '@mikro-orm/migrations';

export class Migration20250625124927 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "urat_question_answers" alter column "response" type text using ("response"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "urat_question_answers" alter column "response" type varchar(255) using ("response"::varchar(255));`);
  }

}
