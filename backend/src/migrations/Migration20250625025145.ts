import { Migration } from '@mikro-orm/migrations';

export class Migration20250625025145 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "initiatives" drop constraint "initiatives_rns_id_foreign";`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "initiatives" drop constraint "initiatives_rns_id_foreign";`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
  }

}
