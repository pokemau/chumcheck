import { Migration } from '@mikro-orm/migrations';

export class Migration20250930071640 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_responses" alter column "submitted_at" type timestamptz using ("submitted_at"::timestamptz);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_responses" alter column "submitted_at" type date using ("submitted_at"::date);`);
  }

}
