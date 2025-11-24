"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250502111842 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250502111842 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "roadblocks" ("id" serial primary key, "risk_number" int not null, "description" varchar(255) not null, "fix" varchar(255) not null, "status" text check ("status" in ('New', 'Scheduled', 'On Track', 'Completed', 'Delayed', 'Discontinued', 'Long Term')) not null, "assignee_id" int not null, "startup_id" int not null, "is_ai_generated" boolean not null);`);
        this.addSql(`alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
        this.addSql(`alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "roadblocks" cascade;`);
    }
}
exports.Migration20250502111842 = Migration20250502111842;
//# sourceMappingURL=Migration20250502111842.js.map