import { Migration } from '@mikro-orm/migrations';

export class Migration20250502111842 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "roadblocks" ("id" serial primary key, "risk_number" int not null, "description" varchar(255) not null, "fix" varchar(255) not null, "status" text check ("status" in ('New', 'Scheduled', 'On Track', 'Completed', 'Delayed', 'Discontinued', 'Long Term')) not null, "assignee_id" int not null, "startup_id" int not null, "is_ai_generated" boolean not null);`);

    this.addSql(`alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "roadblocks" cascade;`);
  }

}
