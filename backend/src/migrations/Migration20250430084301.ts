import { Migration } from '@mikro-orm/migrations';

export class Migration20250430084301 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "startups_mentors" ("startup_id" int not null, "user_id" int not null, constraint "startups_mentors_pkey" primary key ("startup_id", "user_id"));`,
    );

    this.addSql(
      `alter table "startups_mentors" add constraint "startups_mentors_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "startups_mentors" add constraint "startups_mentors_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startups_mentors" cascade;`);
  }
}
