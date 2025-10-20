import { Migration } from '@mikro-orm/migrations';

export class Migration20250516035903 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "rns" alter column "status" type smallint using ("status"::smallint);`,
    );
    this.addSql(`alter table "rns" alter column "status" set default 1;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" alter column "status" drop default;`);
    this.addSql(
      `alter table "rns" alter column "status" type int using ("status"::int);`,
    );
  }
}
