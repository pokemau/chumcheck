"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250519123018 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250519123018 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "initiatives" alter column "description" type text using ("description"::text);`);
        this.addSql(`alter table "initiatives" alter column "measures" type text using ("measures"::text);`);
        this.addSql(`alter table "initiatives" alter column "targets" type text using ("targets"::text);`);
        this.addSql(`alter table "initiatives" alter column "remarks" type text using ("remarks"::text);`);
    }
    async down() {
        this.addSql(`alter table "initiatives" alter column "description" type varchar(255) using ("description"::varchar(255));`);
        this.addSql(`alter table "initiatives" alter column "measures" type varchar(255) using ("measures"::varchar(255));`);
        this.addSql(`alter table "initiatives" alter column "targets" type varchar(255) using ("targets"::varchar(255));`);
        this.addSql(`alter table "initiatives" alter column "remarks" type varchar(255) using ("remarks"::varchar(255));`);
    }
}
exports.Migration20250519123018 = Migration20250519123018;
//# sourceMappingURL=Migration20250519123018.js.map