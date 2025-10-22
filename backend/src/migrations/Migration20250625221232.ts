import { Migration } from '@mikro-orm/migrations';

export class Migration20250625221232 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "rna_chat_history" ("id" serial primary key, "rna_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_rna" text null);`,
    );

    this.addSql(
      `alter table "rna_chat_history" add constraint "rna_chat_history_rna_id_foreign" foreign key ("rna_id") references "rna" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "rna_chat_history" cascade;`);
  }
}
