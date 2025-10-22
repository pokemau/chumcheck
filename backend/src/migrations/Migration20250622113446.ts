import { Migration } from '@mikro-orm/migrations';

export class Migration20250622113446 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Unchanged';`,
    );

    this.addSql(
      `alter table "rns" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Unchanged';`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" drop column "requested_status", drop column "approval_status";`,
    );

    this.addSql(
      `alter table "rns" drop column "requested_status", drop column "approval_status";`,
    );
  }
}
