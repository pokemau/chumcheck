import { Migration } from '@mikro-orm/migrations';

export class Migration20250928084447 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" add column "ai_analysis_summary" text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "capsule_proposals" drop column "ai_analysis_summary";`);
  }

}
