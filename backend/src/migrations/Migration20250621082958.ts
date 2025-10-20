import { Migration } from '@mikro-orm/migrations';

export class Migration20250621082958 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "initiatives" alter column "approval_status" type varchar(255) using ("approval_status"::varchar(255));`,
    );
    this.addSql(
      `alter table "initiatives" alter column "approval_status" set default 'Unchanged';`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "initiatives" alter column "approval_status" type varchar(255) using ("approval_status"::varchar(255));`,
    );
    this.addSql(
      `alter table "initiatives" alter column "approval_status" set default 'Pending';`,
    );
  }
}
