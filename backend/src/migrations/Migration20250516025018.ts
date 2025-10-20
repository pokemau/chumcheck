import { Migration } from '@mikro-orm/migrations';

export class Migration20250516025018 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "rns" alter column "status" drop default;`);
    this.addSql(
      `alter table "rns" alter column "status" type int using ("status"::int);`,
    );
    this.addSql(`alter table "rns" alter column "status" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "rns" alter column "status" type int using ("status"::int);`,
    );
    this.addSql(`alter table "rns" alter column "status" set default 1;`);
    this.addSql(`alter table "rns" alter column "status" drop not null;`);
  }
}
