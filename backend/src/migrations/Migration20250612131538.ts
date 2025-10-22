import { Migration } from '@mikro-orm/migrations';

export class Migration20250612131538 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "elevate_logs" drop column "updated_at", drop column "previous_level", drop column "new_level";`,
    );

    this.addSql(`alter table "elevate_logs" add column "level" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "elevate_logs" add column "updated_at" timestamptz not null, add column "new_level" int not null;`,
    );
    this.addSql(
      `alter table "elevate_logs" rename column "level" to "previous_level";`,
    );
  }
}
