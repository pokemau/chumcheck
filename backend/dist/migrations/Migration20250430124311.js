"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250430124311 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250430124311 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "readinesslevels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`drop table if exists "readinesslevel" cascade;`);
    }
    async down() {
        this.addSql(`create table "readinesslevel" ("id" serial primary key, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`drop table if exists "readinesslevels" cascade;`);
    }
}
exports.Migration20250430124311 = Migration20250430124311;
//# sourceMappingURL=Migration20250430124311.js.map