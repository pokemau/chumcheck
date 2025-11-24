"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251001134525 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251001134525 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "startup_waitlist_messages" add column "manager_id" int not null;`);
        this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_manager_id_foreign" foreign key ("manager_id") references "users" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_manager_id_foreign";`);
        this.addSql(`alter table "startup_waitlist_messages" drop column "manager_id";`);
    }
}
exports.Migration20251001134525 = Migration20251001134525;
//# sourceMappingURL=Migration20251001134525.js.map