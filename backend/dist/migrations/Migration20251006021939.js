"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251006021939 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251006021939 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "startup_responses" add column "file_name" varchar(255) null;`);
    }
    async down() {
        this.addSql(`alter table "startup_responses" drop column "file_name";`);
    }
}
exports.Migration20251006021939 = Migration20251006021939;
//# sourceMappingURL=Migration20251006021939.js.map