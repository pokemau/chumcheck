"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250519122459 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250519122459 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "initiatives" ("id" serial primary key, "initiative_number" int not null, "status" smallint not null, "rns_id" int not null, "is_ai_generated" boolean not null, "assignee_id" int not null, "startup_id" int not null, "description" varchar(255) not null, "measures" varchar(255) not null, "targets" varchar(255) not null, "remarks" varchar(255) not null, "datetime_created" timestamptz not null, "datetime_updated" timestamptz not null);`);
        this.addSql(`alter table "initiatives" add constraint "initiatives_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
        this.addSql(`alter table "initiatives" add constraint "initiatives_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
        this.addSql(`alter table "initiatives" add constraint "initiatives_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "initiatives" cascade;`);
    }
}
exports.Migration20250519122459 = Migration20250519122459;
//# sourceMappingURL=Migration20250519122459.js.map