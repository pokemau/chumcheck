import { Migration } from '@mikro-orm/migrations';

export class Migration20250502093812 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "startups" add column "datetime_deleted" timestamp with time zone null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "startups" drop column "datetime_deleted";');
  }
}
