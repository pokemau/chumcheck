"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250612131538 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250612131538 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "elevate_logs" drop column "updated_at", drop column "previous_level", drop column "new_level";`);
        this.addSql(`alter table "elevate_logs" add column "level" int not null;`);
    }
    async down() {
        this.addSql(`alter table "elevate_logs" add column "updated_at" timestamptz not null, add column "new_level" int not null;`);
        this.addSql(`alter table "elevate_logs" rename column "level" to "previous_level";`);
    }
}
exports.Migration20250612131538 = Migration20250612131538;
//# sourceMappingURL=Migration20250612131538.js.map