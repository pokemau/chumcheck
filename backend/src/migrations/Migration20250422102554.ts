import { Migration } from '@mikro-orm/migrations';

export class Migration20250422102554 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "capsule_proposals" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "problem_statement" varchar(255) not null, "target_market" varchar(255) not null, "solution_description" varchar(255) not null, "objectives" varchar(255) not null, "scope" varchar(255) not null, "methodology" varchar(255) not null, "startup_id" int not null);`);
    this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_unique" unique ("startup_id");`);

    this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startup" ("id") on update cascade;`);

    this.addSql(`alter table "startup" add column "qualification_status" smallint not null default 1, add column "data_privacy" boolean not null default false, add column "links" text null, add column "group_name" varchar(100) null, add column "university_name" varchar(100) null, add column "eligibility" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "capsule_proposals" cascade;`);

    this.addSql(`alter table "startup" drop column "qualification_status", drop column "data_privacy", drop column "links", drop column "group_name", drop column "university_name", drop column "eligibility";`);
  }

}
