import { Migration } from '@mikro-orm/migrations';

export class Migration20250625025450 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "rns_chat_history" drop constraint "rns_chat_history_rns_id_foreign";`,
    );

    this.addSql(
      `alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "rns_chat_history" drop constraint "rns_chat_history_rns_id_foreign";`,
    );

    this.addSql(
      `alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`,
    );
  }
}
