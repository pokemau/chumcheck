import { Migration } from '@mikro-orm/migrations';

export class Migration20250928072746 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" add column "created_at" date not null default CURRENT_TIMESTAMP;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" drop column "created_at";`);
  }

}
