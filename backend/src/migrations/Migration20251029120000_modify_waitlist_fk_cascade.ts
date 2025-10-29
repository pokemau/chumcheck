import { Migration } from '@mikro-orm/migrations';

export class Migration20251029120000_modify_waitlist_fk_cascade extends Migration {
  override async up(): Promise<void> {
    // Ensure table exists with all required columns
    this.addSql(
      'create table if not exists "startup_waitlist_messages" (' +
        '"id" serial primary key, ' +
        '"startup_id" int not null, ' +
        '"manager_id" int not null, ' +
        '"message" text not null, ' +
        '"created_at" date not null default CURRENT_TIMESTAMP' +
      ');',
    );

    // In case table exists but some columns are missing (older DB), add them
    this.addSql('alter table "startup_waitlist_messages" add column if not exists "manager_id" int;');
    this.addSql('alter table "startup_waitlist_messages" add column if not exists "created_at" date default CURRENT_TIMESTAMP;');

    // Recreate FKs with ON DELETE CASCADE
    this.addSql('alter table "startup_waitlist_messages" drop constraint if exists "startup_waitlist_messages_startup_id_foreign";');
    this.addSql('alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "startup_waitlist_messages" drop constraint if exists "startup_waitlist_messages_manager_id_foreign";');
    this.addSql('alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade on delete cascade;');
  }

  override async down(): Promise<void> {
    // Revert FKs to non-cascading (do not drop table to keep data)
    this.addSql('alter table "startup_waitlist_messages" drop constraint if exists "startup_waitlist_messages_startup_id_foreign";');
    this.addSql('alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "startup_waitlist_messages" drop constraint if exists "startup_waitlist_messages_manager_id_foreign";');
    this.addSql('alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade;');
  }
}
