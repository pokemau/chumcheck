import { Migration } from '@mikro-orm/migrations';

export class Migration20250422120810 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" alter column "hash" type varchar(255) using ("hash"::varchar(255));`);
    this.addSql(`alter table "users" alter column "hash" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" alter column "hash" type varchar(255) using ("hash"::varchar(255));`);
    this.addSql(`alter table "users" alter column "hash" set not null;`);
  }

}
