import { Migration } from '@mikro-orm/migrations';

export class Migration20251001134525 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" add column "manager_id" int not null;`);
    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_manager_id_foreign";`);

    this.addSql(`alter table "startup_waitlist_messages" drop column "manager_id";`);
  }

}
