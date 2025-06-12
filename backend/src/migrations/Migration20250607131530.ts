import { Migration } from '@mikro-orm/migrations';

export class Migration20250607131530 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" add column "is_new" boolean not null default false;`);

    this.addSql(`alter table "initiatives" add column "priority_number" int not null, add column "is_new" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "is_new";`);

    this.addSql(`alter table "initiatives" drop column "priority_number", drop column "is_new";`);
  }

}
