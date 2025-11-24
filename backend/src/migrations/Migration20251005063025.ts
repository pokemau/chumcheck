import { Migration } from '@mikro-orm/migrations';

export class Migration20251005063025 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" alter column "intellectual_property_status" type text using ("intellectual_property_status"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" alter column "intellectual_property_status" type varchar(255) using ("intellectual_property_status"::varchar(255));`);
  }

}
