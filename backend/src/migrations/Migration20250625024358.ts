import { Migration } from '@mikro-orm/migrations';

export class Migration20250625024358 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "roadblock_chat_history" drop constraint "roadblock_chat_history_roadblock_id_foreign";`);

    this.addSql(`alter table "roadblock_chat_history" add constraint "roadblock_chat_history_roadblock_id_foreign" foreign key ("roadblock_id") references "roadblocks" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "roadblock_chat_history" drop constraint "roadblock_chat_history_roadblock_id_foreign";`);

    this.addSql(`alter table "roadblock_chat_history" add constraint "roadblock_chat_history_roadblock_id_foreign" foreign key ("roadblock_id") references "roadblocks" ("id") on update cascade;`);
  }

}
