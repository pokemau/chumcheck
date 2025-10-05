import { Migration } from '@mikro-orm/migrations';

export class Migration20250519121226 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "rns" drop constraint "rns_user_id_foreign";`);

    this.addSql(`alter table "rns" rename column "user_id" to "asignee_id";`);
    this.addSql(
      `alter table "rns" add constraint "rns_asignee_id_foreign" foreign key ("asignee_id") references "users" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop constraint "rns_asignee_id_foreign";`);

    this.addSql(`alter table "rns" rename column "asignee_id" to "user_id";`);
    this.addSql(
      `alter table "rns" add constraint "rns_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`,
    );
  }
}
