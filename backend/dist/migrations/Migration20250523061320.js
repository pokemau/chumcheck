"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250523061320 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250523061320 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" alter column "description" type text using ("description"::text);`);
    }
    async down() {
        this.addSql(`alter table "rns" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    }
}
exports.Migration20250523061320 = Migration20250523061320;
//# sourceMappingURL=Migration20250523061320.js.map