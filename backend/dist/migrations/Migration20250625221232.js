"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625221232 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625221232 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "rna_chat_history" ("id" serial primary key, "rna_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_rna" text null);`);
        this.addSql(`alter table "rna_chat_history" add constraint "rna_chat_history_rna_id_foreign" foreign key ("rna_id") references "rna" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "rna_chat_history" cascade;`);
    }
}
exports.Migration20250625221232 = Migration20250625221232;
//# sourceMappingURL=Migration20250625221232.js.map