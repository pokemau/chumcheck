"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625024358 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625024358 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "roadblock_chat_history" drop constraint "roadblock_chat_history_roadblock_id_foreign";`);
        this.addSql(`alter table "roadblock_chat_history" add constraint "roadblock_chat_history_roadblock_id_foreign" foreign key ("roadblock_id") references "roadblocks" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table "roadblock_chat_history" drop constraint "roadblock_chat_history_roadblock_id_foreign";`);
        this.addSql(`alter table "roadblock_chat_history" add constraint "roadblock_chat_history_roadblock_id_foreign" foreign key ("roadblock_id") references "roadblocks" ("id") on update cascade;`);
    }
}
exports.Migration20250625024358 = Migration20250625024358;
//# sourceMappingURL=Migration20250625024358.js.map