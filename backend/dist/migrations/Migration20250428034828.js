"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250428034828 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250428034828 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);
        this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition/Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`);
    }
    async down() {
        this.addSql(`alter table "calculator_questions" drop constraint if exists "calculator_questions_category_check";`);
        this.addSql(`alter table "calculator_questions" add constraint "calculator_questions_category_check" check("category" in ('Technology', 'Product Development', 'Product Definition Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain'));`);
    }
}
exports.Migration20250428034828 = Migration20250428034828;
//# sourceMappingURL=Migration20250428034828.js.map