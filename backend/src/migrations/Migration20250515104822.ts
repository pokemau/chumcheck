import { Migration } from '@mikro-orm/migrations';

export class Migration20250515104822 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "startups_members" ("startup_id" int not null, "user_id" int not null, constraint "startups_members_pkey" primary key ("startup_id", "user_id"));`);

    this.addSql(`create table "rns" ("id" serial primary key, "prioritynumber" int not null, "description" varchar(255) not null, "isaigenerated" boolean not null, "startup_id" int not null, "user_id" int not null);`);

    this.addSql(`alter table "startups_members" add constraint "startups_members_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "startups_members" add constraint "startups_members_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "rns" add constraint "rns_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    this.addSql(`alter table "rns" add constraint "rns_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startups_members" cascade;`);

    this.addSql(`drop table if exists "rns" cascade;`);
  }

}
