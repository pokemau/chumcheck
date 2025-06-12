import { Migration } from '@mikro-orm/migrations';

export class Migration20250608024122 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" add column "clicked_by_startup" boolean not null default false;`);
    this.addSql(`alter table "rns" rename column "is_new" to "clicked_by_mentor";`);

    this.addSql(`alter table "initiatives" add column "clicked_by_startup" boolean not null default false;`);
    this.addSql(`alter table "initiatives" rename column "is_new" to "clicked_by_mentor";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "clicked_by_startup";`);

    this.addSql(`alter table "rns" rename column "clicked_by_mentor" to "is_new";`);

    this.addSql(`alter table "initiatives" drop column "clicked_by_startup";`);

    this.addSql(`alter table "initiatives" rename column "clicked_by_mentor" to "is_new";`);
  }

}
