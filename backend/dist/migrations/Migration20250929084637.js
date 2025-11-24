"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250929084637 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250929084637 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "assessments" add column "field_key" varchar(255) not null;`);
    }
    async down() {
        this.addSql(`alter table "assessments" drop column "field_key";`);
    }
}
exports.Migration20250929084637 = Migration20250929084637;
//# sourceMappingURL=Migration20250929084637.js.map