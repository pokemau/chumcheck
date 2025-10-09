import { Migration } from '@mikro-orm/migrations';

export class Migration20250929084637 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "assessments" add column "field_key" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "assessments" drop column "field_key";`);
  }

}
