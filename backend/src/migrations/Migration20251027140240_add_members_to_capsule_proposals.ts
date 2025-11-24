import { Migration } from '@mikro-orm/migrations';

export class Migration20251027140240_add_members_to_capsule_proposals extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" add column "members" jsonb not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" drop column "members";`);
  }

}
