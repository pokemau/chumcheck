import { Migration } from '@mikro-orm/migrations';

export class Migration20250519123018 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "initiatives" alter column "description" type text using ("description"::text);`);
    this.addSql(`alter table "initiatives" alter column "measures" type text using ("measures"::text);`);
    this.addSql(`alter table "initiatives" alter column "targets" type text using ("targets"::text);`);
    this.addSql(`alter table "initiatives" alter column "remarks" type text using ("remarks"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "initiatives" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    this.addSql(`alter table "initiatives" alter column "measures" type varchar(255) using ("measures"::varchar(255));`);
    this.addSql(`alter table "initiatives" alter column "targets" type varchar(255) using ("targets"::varchar(255));`);
    this.addSql(`alter table "initiatives" alter column "remarks" type varchar(255) using ("remarks"::varchar(255));`);
  }

}
