import { Migration } from '@mikro-orm/migrations';

export class Migration20250516040948 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" add column "target_level" int not null;`);
    this.addSql(`alter table "rns" rename column "prioritynumber" to "priority_number";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "target_level";`);

    this.addSql(`alter table "rns" rename column "priority_number" to "prioritynumber";`);
  }

}
