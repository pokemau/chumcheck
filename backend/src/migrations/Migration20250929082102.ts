import { Migration } from '@mikro-orm/migrations';

export class Migration20250929082102 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "startup_assessments" ("id" serial primary key, "startup_id" int not null, "assessment_type" smallint not null, "status" smallint not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "startup_assessments" cascade;`);
  }

}
