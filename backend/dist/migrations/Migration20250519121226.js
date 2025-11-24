"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250519121226 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250519121226 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" drop constraint "rns_user_id_foreign";`);
        this.addSql(`alter table "rns" rename column "user_id" to "asignee_id";`);
        this.addSql(`alter table "rns" add constraint "rns_asignee_id_foreign" foreign key ("asignee_id") references "users" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop constraint "rns_asignee_id_foreign";`);
        this.addSql(`alter table "rns" rename column "asignee_id" to "user_id";`);
        this.addSql(`alter table "rns" add constraint "rns_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    }
}
exports.Migration20250519121226 = Migration20250519121226;
//# sourceMappingURL=Migration20250519121226.js.map