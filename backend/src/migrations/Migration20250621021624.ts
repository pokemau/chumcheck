import { Migration } from '@mikro-orm/migrations';

export class Migration20250621021624 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "initiatives" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Pending';`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "initiatives" drop column "requested_status", drop column "approval_status";`,
    );
  }
}
