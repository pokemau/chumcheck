import { Migration } from '@mikro-orm/migrations';

export class Migration20250521020107 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" drop constraint if exists "roadblocks_status_check";`,
    );

    this.addSql(
      `alter table "roadblocks" add column "datetime_created" timestamptz not null, add column "datetime_updated" timestamptz not null;`,
    );
    this.addSql(
      `alter table "roadblocks" alter column "description" type text using ("description"::text);`,
    );
    this.addSql(
      `alter table "roadblocks" alter column "fix" type text using ("fix"::text);`,
    );
    this.addSql(
      `alter table "roadblocks" alter column "status" type smallint using ("status"::smallint);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" drop constraint if exists "roadblocks_status_check";`,
    );

    this.addSql(
      `alter table "roadblocks" drop column "datetime_created", drop column "datetime_updated";`,
    );

    this.addSql(
      `alter table "roadblocks" alter column "status" type text using ("status"::text);`,
    );
    this.addSql(
      `alter table "roadblocks" alter column "description" type varchar(255) using ("description"::varchar(255));`,
    );
    this.addSql(
      `alter table "roadblocks" alter column "fix" type varchar(255) using ("fix"::varchar(255));`,
    );
    this.addSql(
      `alter table "roadblocks" add constraint "roadblocks_status_check" check("status" in ('New', 'Scheduled', 'On Track', 'Completed', 'Delayed', 'Discontinued', 'Long Term'));`,
    );
  }
}
