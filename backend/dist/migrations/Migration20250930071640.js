"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250930071640 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250930071640 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "startup_responses" alter column "submitted_at" type timestamptz using ("submitted_at"::timestamptz);`);
    }
    async down() {
        this.addSql(`alter table "startup_responses" alter column "submitted_at" type date using ("submitted_at"::date);`);
    }
}
exports.Migration20250930071640 = Migration20250930071640;
//# sourceMappingURL=Migration20250930071640.js.map