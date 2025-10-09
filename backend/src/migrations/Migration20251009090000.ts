import { Migration } from '@mikro-orm/migrations';

// Adds ON DELETE CASCADE to foreign keys referencing assessment_types
export class Migration20251009090000 extends Migration {
  override async up(): Promise<void> {
    // Drop existing FKs (names from earlier migrations) and recreate with ON DELETE CASCADE
    this.addSql('alter table "assessments" drop constraint if exists "assessments_assessment_type_id_foreign";');
    this.addSql('alter table "startup_assessments" drop constraint if exists "startup_assessments_assessment_type_id_foreign";');

    this.addSql('alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "assessments" drop constraint if exists "assessments_assessment_type_id_foreign";');
    this.addSql('alter table "startup_assessments" drop constraint if exists "startup_assessments_assessment_type_id_foreign";');

    this.addSql('alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;');
    this.addSql('alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;');
  }
}
