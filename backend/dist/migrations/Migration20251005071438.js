"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251005071438 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251005071438 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "assessments" drop column "field_key";`);
    }
    async down() {
        this.addSql(`alter table "assessments" add column "field_key" varchar(255) not null;`);
    }
}
exports.Migration20251005071438 = Migration20251005071438;
//# sourceMappingURL=Migration20251005071438.js.map