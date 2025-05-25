import { Migration } from '@mikro-orm/migrations';

export class Migration20250525103339 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns_chat_history" alter column "refined_description" type text using ("refined_description"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns_chat_history" alter column "refined_description" type varchar(255) using ("refined_description"::varchar(255));`);
  }

}
