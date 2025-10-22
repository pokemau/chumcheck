import { Migration } from '@mikro-orm/migrations';

export class Migration20250428034828 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`,
    );

    this.addSql(
      `alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`,
    );

    this.addSql(
      `alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`,
    );
  }
}
