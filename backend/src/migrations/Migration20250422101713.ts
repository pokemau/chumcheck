import { Migration } from '@mikro-orm/migrations';

export class Migration20250422101713 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "startup" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null);`);

    this.addSql(`alter table "startup" add constraint "startup_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startup" cascade;`);
  }

}
