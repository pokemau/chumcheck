import { Migration } from '@mikro-orm/migrations';

export class Migration20250522082106 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" alter column "description" type text using ("description"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "problem_statement" type text using ("problem_statement"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "target_market" type text using ("target_market"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "solution_description" type text using ("solution_description"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "objectives" type text using ("objectives"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "scope" type text using ("scope"::text);`);
    this.addSql(`alter table "capsule_proposals" alter column "methodology" type text using ("methodology"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "problem_statement" type varchar(255) using ("problem_statement"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "target_market" type varchar(255) using ("target_market"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "solution_description" type varchar(255) using ("solution_description"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "objectives" type varchar(255) using ("objectives"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "scope" type varchar(255) using ("scope"::varchar(255));`);
    this.addSql(`alter table "capsule_proposals" alter column "methodology" type varchar(255) using ("methodology"::varchar(255));`);
  }

}
