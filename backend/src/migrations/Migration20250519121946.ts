import { Migration } from '@mikro-orm/migrations';

export class Migration20250519121946 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rns" drop constraint "rns_asignee_id_foreign";`);

    this.addSql(`alter table "rns" rename column "asignee_id" to "assignee_id";`);
    this.addSql(`alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "rns" drop constraint "rns_assignee_id_foreign";`);

    this.addSql(`alter table "rns" rename column "assignee_id" to "asignee_id";`);
    this.addSql(`alter table "rns" add constraint "rns_asignee_id_foreign" foreign key ("asignee_id") references "users" ("id") on update cascade;`);
  }

}
