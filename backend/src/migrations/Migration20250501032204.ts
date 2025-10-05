import { Migration } from '@mikro-orm/migrations';

export class Migration20250501032204 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "readiness_levels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`,
    );

    this.addSql(`drop table if exists "readinesslevels" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "readinesslevels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`,
    );

    this.addSql(`drop table if exists "readiness_levels" cascade;`);
  }
}
