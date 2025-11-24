import { Migration } from '@mikro-orm/migrations';

export class Migration20250609142411 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" add column "clicked_by_mentor" boolean not null default false, add column "clicked_by_startup" boolean not null default false;`,
    );

    this.addSql(
      `alter table "rns" alter column "is_ai_generated" type boolean using ("is_ai_generated"::boolean);`,
    );
    this.addSql(
      `alter table "rns" alter column "is_ai_generated" set default false;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "roadblocks" drop column "clicked_by_mentor", drop column "clicked_by_startup";`,
    );

    this.addSql(
      `alter table "rns" alter column "is_ai_generated" drop default;`,
    );
    this.addSql(
      `alter table "rns" alter column "is_ai_generated" type boolean using ("is_ai_generated"::boolean);`,
    );
  }
}
