import { Migration } from '@mikro-orm/migrations';

export class Migration20250625025256 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "initiative_chat_history" drop constraint "initiative_chat_history_initiative_id_foreign";`);

    this.addSql(`alter table "initiative_chat_history" add constraint "initiative_chat_history_initiative_id_foreign" foreign key ("initiative_id") references "initiatives" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "initiative_chat_history" drop constraint "initiative_chat_history_initiative_id_foreign";`);

    this.addSql(`alter table "initiative_chat_history" add constraint "initiative_chat_history_initiative_id_foreign" foreign key ("initiative_id") references "initiatives" ("id") on update cascade;`);
  }

}
