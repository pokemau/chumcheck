"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250525103339 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250525103339 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns_chat_history" alter column "refined_description" type text using ("refined_description"::text);`);
    }
    async down() {
        this.addSql(`alter table "rns_chat_history" alter column "refined_description" type varchar(255) using ("refined_description"::varchar(255));`);
    }
}
exports.Migration20250525103339 = Migration20250525103339;
//# sourceMappingURL=Migration20250525103339.js.map