"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250428045432 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250428045432 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "calculator_question_answers" ("id" serial primary key);`);
        this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);
        this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing/Supply Chain'));`);
    }
    async down() {
        this.addSql(`drop table if exists "calculator_question_answers" cascade;`);
        this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);
        this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`);
    }
}
exports.Migration20250428045432 = Migration20250428045432;
//# sourceMappingURL=Migration20250428045432.js.map