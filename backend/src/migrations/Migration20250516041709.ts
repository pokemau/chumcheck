import { Migration } from '@mikro-orm/migrations';

export class Migration20250516041709 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "rns" add column "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop column "readiness_type";`);
  }
}
