"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251005063025 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251005063025 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" alter column "intellectual_property_status" type text using ("intellectual_property_status"::text);`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" alter column "intellectual_property_status" type varchar(255) using ("intellectual_property_status"::varchar(255));`);
    }
}
exports.Migration20251005063025 = Migration20251005063025;
//# sourceMappingURL=Migration20251005063025.js.map