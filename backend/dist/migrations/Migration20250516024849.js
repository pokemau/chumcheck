"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516024849 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516024849 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" alter column "status" type int using ("status"::int);`);
        this.addSql(`alter table "rns" alter column "status" set default 1;`);
    }
    async down() {
        this.addSql(`alter table "rns" alter column "status" drop default;`);
        this.addSql(`alter table "rns" alter column "status" type int using ("status"::int);`);
    }
}
exports.Migration20250516024849 = Migration20250516024849;
//# sourceMappingURL=Migration20250516024849.js.map