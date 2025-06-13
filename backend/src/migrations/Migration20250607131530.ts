import { Migration } from '@mikro-orm/migrations';

export class Migration20250607131530 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "rns" add column "is_new" boolean not null default false;`,
    );

    this.addSql(`alter table "initiatives" add column "priority_number" int;`);
    this.addSql(
      `alter table "initiatives" add column "is_new" boolean not null default false;`,
    );
    this.addSql(
      `update "initiatives" set "priority_number" = 0 where "priority_number" is null;`,
    );
    this.addSql(
      `alter table "initiatives" alter column "priority_number" set not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "is_new";`);

    this.addSql(
      `alter table "initiatives" drop column "priority_number", drop column "is_new";`,
    );
  }
}
