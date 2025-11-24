"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625025450 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625025450 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns_chat_history" drop constraint "rns_chat_history_rns_id_foreign";`);
        this.addSql(`alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table "rns_chat_history" drop constraint "rns_chat_history_rns_id_foreign";`);
        this.addSql(`alter table "rns_chat_history" add constraint "rns_chat_history_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
    }
}
exports.Migration20250625025450 = Migration20250625025450;
//# sourceMappingURL=Migration20250625025450.js.map