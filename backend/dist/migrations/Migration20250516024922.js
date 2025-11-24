"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516024922 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516024922 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" alter column "status" type int using ("status"::int);`);
        this.addSql(`alter table "rns" alter column "status" drop not null;`);
    }
    async down() {
        this.addSql(`alter table "rns" alter column "status" type int using ("status"::int);`);
        this.addSql(`alter table "rns" alter column "status" set not null;`);
    }
}
exports.Migration20250516024922 = Migration20250516024922;
//# sourceMappingURL=Migration20250516024922.js.map