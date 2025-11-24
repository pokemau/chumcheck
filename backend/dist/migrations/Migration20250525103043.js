"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250525103043 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250525103043 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "rns_chat_history" ("id" serial primary key, "rns_id" int not null, "role" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "refined_description" varchar(255) null);`);
        this.addSql(`alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "rns_chat_history" cascade;`);
    }
}
exports.Migration20250525103043 = Migration20250525103043;
//# sourceMappingURL=Migration20250525103043.js.map