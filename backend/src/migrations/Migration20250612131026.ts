import { Migration } from '@mikro-orm/migrations';

export class Migration20250612131026 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "entity_logs" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "previous_level" int not null, "new_level" int not null, "startup_id" int not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);

    this.addSql(`alter table "entity_logs" add constraint "entity_logs_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "entity_logs" cascade;`);
  }

}
