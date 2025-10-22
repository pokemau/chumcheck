import { Migration } from '@mikro-orm/migrations';

export class Migration20250503070805 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "startup_rnas" ("id" serial primary key, "readiness_level_id" int not null, "startup_id" int not null, "is_ai_generated" boolean not null, "rna" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`,
    );

    this.addSql(
      `alter table "startup_rnas" add constraint "startup_rnas_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "startup_rnas" add constraint "startup_rnas_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startup_rnas" cascade;`);
  }
}
