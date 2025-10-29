import { Migration } from '@mikro-orm/migrations';

export class Migration20250612232856 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "elevate_logs" drop column "readiness_type";`);

    this.addSql(
      `alter table "elevate_logs" add column "readiness_level_id" int not null;`,
    );
    this.addSql(
      `alter table "elevate_logs" add constraint "elevate_logs_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "elevate_logs" drop constraint "elevate_logs_readiness_level_id_foreign";`,
    );

    this.addSql(`alter table "elevate_logs" drop column "readiness_level_id";`);

    this.addSql(
      `alter table "elevate_logs" add column "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null;`,
    );
  }
}
