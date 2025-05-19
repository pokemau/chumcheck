import { Migration } from '@mikro-orm/migrations';

export class Migration20250517122019 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" drop column "target_level";`);

    this.addSql(`alter table "rns" add column "target_level_id" int not null;`);
    this.addSql(`alter table "rns" add constraint "rns_target_level_id_foreign" foreign key ("target_level_id") references "readiness_levels" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop constraint "rns_target_level_id_foreign";`);

    this.addSql(`alter table "rns" drop column "target_level_id";`);

    this.addSql(`alter table "rns" add column "target_level" int not null;`);
  }

}
