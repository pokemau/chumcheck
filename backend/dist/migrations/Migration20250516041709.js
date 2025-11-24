"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516041709 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516041709 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" add column "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop column "readiness_type";`);
    }
}
exports.Migration20250516041709 = Migration20250516041709;
//# sourceMappingURL=Migration20250516041709.js.map