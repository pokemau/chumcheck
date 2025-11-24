"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250924033059 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250924033059 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" drop column "file_name";`);
        this.addSql(`alter table "capsule_proposals" add column "historical_timeline" jsonb not null, add column "competitive_advantage_analysis" jsonb not null, add column "intellectual_property_status" varchar(255) not null, add column "curriculum_vitae" text null;`);
        this.addSql(`alter table "capsule_proposals" alter column "objectives" type jsonb using ("objectives"::jsonb);`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" drop column "historical_timeline", drop column "competitive_advantage_analysis", drop column "intellectual_property_status", drop column "curriculum_vitae";`);
        this.addSql(`alter table "capsule_proposals" add column "file_name" varchar(255) null;`);
        this.addSql(`alter table "capsule_proposals" alter column "objectives" type text using ("objectives"::text);`);
    }
}
exports.Migration20250924033059 = Migration20250924033059;
//# sourceMappingURL=Migration20250924033059.js.map