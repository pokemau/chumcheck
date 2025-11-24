"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250612131026 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250612131026 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "entity_logs" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "previous_level" int not null, "new_level" int not null, "startup_id" int not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`alter table "entity_logs" add constraint "entity_logs_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "entity_logs" cascade;`);
    }
}
exports.Migration20250612131026 = Migration20250612131026;
//# sourceMappingURL=Migration20250612131026.js.map