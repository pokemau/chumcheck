"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250430084301 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250430084301 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "startups_mentors" ("startup_id" int not null, "user_id" int not null, constraint "startups_mentors_pkey" primary key ("startup_id", "user_id"));`);
        this.addSql(`alter table "startups_mentors" add constraint "startups_mentors_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table "startups_mentors" add constraint "startups_mentors_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "startups_mentors" cascade;`);
    }
}
exports.Migration20250430084301 = Migration20250430084301;
//# sourceMappingURL=Migration20250430084301.js.map