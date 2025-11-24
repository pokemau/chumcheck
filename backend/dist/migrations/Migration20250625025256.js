"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625025256 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625025256 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "initiative_chat_history" drop constraint "initiative_chat_history_initiative_id_foreign";`);
        this.addSql(`alter table "initiative_chat_history" add constraint "initiative_chat_history_initiative_id_foreign" foreign key ("initiative_id") references "initiatives" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table "initiative_chat_history" drop constraint "initiative_chat_history_initiative_id_foreign";`);
        this.addSql(`alter table "initiative_chat_history" add constraint "initiative_chat_history_initiative_id_foreign" foreign key ("initiative_id") references "initiatives" ("id") on update cascade;`);
    }
}
exports.Migration20250625025256 = Migration20250625025256;
//# sourceMappingURL=Migration20250625025256.js.map