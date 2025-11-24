"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250929082102 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250929082102 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "startup_assessments" ("id" serial primary key, "startup_id" int not null, "assessment_type" smallint not null, "status" smallint not null);`);
    }
    async down() {
        this.addSql(`drop table if exists "startup_assessments" cascade;`);
    }
}
exports.Migration20250929082102 = Migration20250929082102;
//# sourceMappingURL=Migration20250929082102.js.map