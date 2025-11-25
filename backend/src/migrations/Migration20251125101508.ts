import { Migration } from '@mikro-orm/migrations';

export class Migration20251125101508 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startups" drop constraint "startups_user_id_foreign";`);

    this.addSql(`alter table "startups" add constraint "startups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startups" drop constraint "startups_user_id_foreign";`);

    this.addSql(`alter table "startups" add constraint "startups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

}
