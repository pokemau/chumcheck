import { Migration } from '@mikro-orm/migrations';

export class Migration20250501071210 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "startups_readiness_level" ("id" serial primary key, "readiness_level_id" int not null, "startup_id" int not null, "remark" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`,
    );

    this.addSql(
      `alter table "startups_readiness_level" add constraint "startups_readiness_level_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "startups_readiness_level" add constraint "startups_readiness_level_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startups_readiness_level" cascade;`);
  }
}
