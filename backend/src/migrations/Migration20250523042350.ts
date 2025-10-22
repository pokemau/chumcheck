import { Migration } from '@mikro-orm/migrations';

export class Migration20250523042350 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "scoring_guide" drop column "start_range", drop column "end_range";`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "scoring_guide" add column "start_range" int not null, add column "end_range" int not null;`,
    );
  }
}
