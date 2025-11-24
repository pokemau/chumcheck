"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250622113446 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250622113446 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "roadblocks" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Unchanged';`);
        this.addSql(`alter table "rns" add column "requested_status" smallint not null default 1, add column "approval_status" varchar(255) not null default 'Unchanged';`);
    }
    async down() {
        this.addSql(`alter table "roadblocks" drop column "requested_status", drop column "approval_status";`);
        this.addSql(`alter table "rns" drop column "requested_status", drop column "approval_status";`);
    }
}
exports.Migration20250622113446 = Migration20250622113446;
//# sourceMappingURL=Migration20250622113446.js.map