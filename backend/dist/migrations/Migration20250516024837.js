"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516024837 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516024837 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" add column "status" int not null;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop column "status";`);
    }
}
exports.Migration20250516024837 = Migration20250516024837;
//# sourceMappingURL=Migration20250516024837.js.map