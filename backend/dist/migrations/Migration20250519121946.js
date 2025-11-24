"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250519121946 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250519121946 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" drop constraint "rns_asignee_id_foreign";`);
        this.addSql(`alter table "rns" rename column "asignee_id" to "assignee_id";`);
        this.addSql(`alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop constraint "rns_assignee_id_foreign";`);
        this.addSql(`alter table "rns" rename column "assignee_id" to "asignee_id";`);
        this.addSql(`alter table "rns" add constraint "rns_asignee_id_foreign" foreign key ("asignee_id") references "users" ("id") on update cascade;`);
    }
}
exports.Migration20250519121946 = Migration20250519121946;
//# sourceMappingURL=Migration20250519121946.js.map