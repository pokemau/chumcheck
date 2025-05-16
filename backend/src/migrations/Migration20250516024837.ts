import { Migration } from '@mikro-orm/migrations';

export class Migration20250516024837 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" add column "status" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "status";`);
  }

}
