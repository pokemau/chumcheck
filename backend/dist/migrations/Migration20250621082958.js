"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250621082958 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250621082958 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "initiatives" alter column "approval_status" type varchar(255) using ("approval_status"::varchar(255));`);
        this.addSql(`alter table "initiatives" alter column "approval_status" set default 'Unchanged';`);
    }
    async down() {
        this.addSql(`alter table "initiatives" alter column "approval_status" type varchar(255) using ("approval_status"::varchar(255));`);
        this.addSql(`alter table "initiatives" alter column "approval_status" set default 'Pending';`);
    }
}
exports.Migration20250621082958 = Migration20250621082958;
//# sourceMappingURL=Migration20250621082958.js.map