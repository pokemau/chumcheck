"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250502093812 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250502093812 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "startups" add column "datetime_deleted" timestamp with time zone null;');
    }
    async down() {
        this.addSql('alter table "startups" drop column "datetime_deleted";');
    }
}
exports.Migration20250502093812 = Migration20250502093812;
//# sourceMappingURL=Migration20250502093812.js.map