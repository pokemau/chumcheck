"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250928072746 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250928072746 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "startup_waitlist_messages" add column "created_at" date not null default CURRENT_TIMESTAMP;`);
    }
    async down() {
        this.addSql(`alter table "startup_waitlist_messages" drop column "created_at";`);
    }
}
exports.Migration20250928072746 = Migration20250928072746;
//# sourceMappingURL=Migration20250928072746.js.map