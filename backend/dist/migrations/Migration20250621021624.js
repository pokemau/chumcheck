"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250621021624 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250621021624 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "initiatives" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Pending';`);
    }
    async down() {
        this.addSql(`alter table "initiatives" drop column "requested_status", drop column "approval_status";`);
    }
}
exports.Migration20250621021624 = Migration20250621021624;
//# sourceMappingURL=Migration20250621021624.js.map