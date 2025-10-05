import { Migration } from '@mikro-orm/migrations';

export class Migration20251005070039 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "assessment_types" rename column "assessment_type" to "type";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "assessment_types" rename column "type" to "assessment_type";`);
  }

}
