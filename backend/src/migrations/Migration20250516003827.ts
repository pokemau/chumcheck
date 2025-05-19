import { Migration } from '@mikro-orm/migrations';

export class Migration20250516003827 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" rename column "isaigenerated" to "is_ai_generated";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" rename column "is_ai_generated" to "isaigenerated";`);
  }

}
