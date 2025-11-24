"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250501032204 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250501032204 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "readiness_levels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`drop table if exists "readinesslevels" cascade;`);
    }
    async down() {
        this.addSql(`create table "readinesslevels" ("id" serial primary key, "level" int not null, "name" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`drop table if exists "readiness_levels" cascade;`);
    }
}
exports.Migration20250501032204 = Migration20250501032204;
//# sourceMappingURL=Migration20250501032204.js.map