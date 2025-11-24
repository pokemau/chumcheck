import { Migration } from '@mikro-orm/migrations';

export class Migration20250928071446 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "startup_waitlist_messages" ("id" serial primary key, "startup_id" int not null, "message" text not null);`);

    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startup_waitlist_messages" cascade;`);
  }

}
