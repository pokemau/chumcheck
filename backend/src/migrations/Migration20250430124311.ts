import { Migration } from '@mikro-orm/migrations';

export class Migration20250430124311 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "readinesslevels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`,
    );

    this.addSql(`drop table if exists "readinesslevel" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "readinesslevel" ("id" serial primary key, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`,
    );

    this.addSql(`drop table if exists "readinesslevels" cascade;`);
  }
}
