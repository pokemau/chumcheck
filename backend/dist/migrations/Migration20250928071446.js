"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250928071446 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250928071446 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "startup_waitlist_messages" ("id" serial primary key, "startup_id" int not null, "message" text not null);`);
        this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "startup_waitlist_messages" cascade;`);
    }
}
exports.Migration20250928071446 = Migration20250928071446;
//# sourceMappingURL=Migration20250928071446.js.map