"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250607131530 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250607131530 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" add column "is_new" boolean not null default false;`);
        this.addSql(`alter table "initiatives" add column "priority_number" int;`);
        this.addSql(`alter table "initiatives" add column "is_new" boolean not null default false;`);
        this.addSql(`update "initiatives" set "priority_number" = 0 where "priority_number" is null;`);
        this.addSql(`alter table "initiatives" alter column "priority_number" set not null;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop column "is_new";`);
        this.addSql(`alter table "initiatives" drop column "priority_number", drop column "is_new";`);
    }
}
exports.Migration20250607131530 = Migration20250607131530;
//# sourceMappingURL=Migration20250607131530.js.map