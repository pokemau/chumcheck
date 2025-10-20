import { Migration } from '@mikro-orm/migrations';

export class Migration20250616142724 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "capsule_proposals" add column "file_name" varchar(255) null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" drop column "file_name";`);
  }
}
