"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625124927 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625124927 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "urat_question_answers" alter column "response" type text using ("response"::text);`);
    }
    async down() {
        this.addSql(`alter table "urat_question_answers" alter column "response" type varchar(255) using ("response"::varchar(255));`);
    }
}
exports.Migration20250625124927 = Migration20250625124927;
//# sourceMappingURL=Migration20250625124927.js.map