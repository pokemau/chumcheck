import { Migration } from '@mikro-orm/migrations';

export class Migration20251125100124 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" drop constraint "capsule_proposals_startup_id_foreign";`);

    this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" drop constraint "capsule_proposals_startup_id_foreign";`);

    this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

}
