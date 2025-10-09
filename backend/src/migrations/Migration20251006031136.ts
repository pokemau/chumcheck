import { Migration } from '@mikro-orm/migrations';

export class Migration20251006031136 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "startup_responses" drop constraint "startup_responses_assessment_assessment_id_foreign";`);

    this.addSql(`alter table "startup_responses" add constraint "startup_responses_assessment_assessment_id_foreign" foreign key ("assessment_assessment_id") references "assessments" ("assessment_id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "startup_responses" drop constraint "startup_responses_assessment_assessment_id_foreign";`);

    this.addSql(`alter table "startup_responses" add constraint "startup_responses_assessment_assessment_id_foreign" foreign key ("assessment_assessment_id") references "assessments" ("assessment_id") on update cascade;`);
  }

}
