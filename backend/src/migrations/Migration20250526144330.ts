import { Migration } from '@mikro-orm/migrations';

export class Migration20250526144330 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "roadblock_chat_history" ("id" serial primary key, "roadblock_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_description" text null, "refined_fix" text null);`);

    this.addSql(`create table "initiative_chat_history" ("id" serial primary key, "initiative_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_description" text null, "refined_measures" text null, "refined_targets" text null, "refined_remarks" text null);`);

    this.addSql(`alter table "roadblock_chat_history" add constraint "roadblock_chat_history_roadblock_id_foreign" foreign key ("roadblock_id") references "roadblocks" ("id") on update cascade;`);

    this.addSql(`alter table "initiative_chat_history" add constraint "initiative_chat_history_initiative_id_foreign" foreign key ("initiative_id") references "initiatives" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "roadblock_chat_history" cascade;`);

    this.addSql(`drop table if exists "initiative_chat_history" cascade;`);
  }

}
