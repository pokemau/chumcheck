import { Migration } from '@mikro-orm/migrations';

export class Migration20251006021939 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_responses" add column "file_name" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_responses" drop column "file_name";`);
  }

}
