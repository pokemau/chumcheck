import { Migration } from '@mikro-orm/migrations';

export class Migration20250525103043 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rns_chat_history" ("id" serial primary key, "rns_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_description" varchar(255) null);`);

    this.addSql(`alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "rns_chat_history" cascade;`);
  }

}
