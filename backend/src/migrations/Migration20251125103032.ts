import { Migration } from '@mikro-orm/migrations';

export class Migration20251125103032 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_manager_id_foreign";`);

    this.addSql(`alter table "roadblocks" drop constraint "roadblocks_assignee_id_foreign";`);

    this.addSql(`alter table "rns" drop constraint "rns_assignee_id_foreign";`);

    this.addSql(`alter table "initiatives" drop constraint "initiatives_assignee_id_foreign";`);

    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_manager_id_foreign";`);

    this.addSql(`alter table "roadblocks" drop constraint "roadblocks_assignee_id_foreign";`);

    this.addSql(`alter table "rns" drop constraint "rns_assignee_id_foreign";`);

    this.addSql(`alter table "initiatives" drop constraint "initiatives_assignee_id_foreign";`);

    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
  }

}
