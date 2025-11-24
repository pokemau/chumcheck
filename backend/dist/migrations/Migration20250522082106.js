"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250522082106 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250522082106 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" alter column "description" type text using ("description"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "problem_statement" type text using ("problem_statement"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "target_market" type text using ("target_market"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "solution_description" type text using ("solution_description"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "objectives" type text using ("objectives"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "scope" type text using ("scope"::text);`);
        this.addSql(`alter table "capsule_proposals" alter column "methodology" type text using ("methodology"::text);`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" alter column "description" type varchar(255) using ("description"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "problem_statement" type varchar(255) using ("problem_statement"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "target_market" type varchar(255) using ("target_market"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "solution_description" type varchar(255) using ("solution_description"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "objectives" type varchar(255) using ("objectives"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "scope" type varchar(255) using ("scope"::varchar(255));`);
        this.addSql(`alter table "capsule_proposals" alter column "methodology" type varchar(255) using ("methodology"::varchar(255));`);
    }
}
exports.Migration20250522082106 = Migration20250522082106;
//# sourceMappingURL=Migration20250522082106.js.map