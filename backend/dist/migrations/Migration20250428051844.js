"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250428051844 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250428051844 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "calculator_question_answers" add column "question_id" int not null, add column "startup_id" int not null;`);
        this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_question_id_foreign" foreign key ("question_id") references "calculator_questions" ("id") on update cascade;`);
        this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_question_id_foreign";`);
        this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);
        this.addSql(`alter table "calculator_question_answers" drop column "question_id", drop column "startup_id";`);
    }
}
exports.Migration20250428051844 = Migration20250428051844;
//# sourceMappingURL=Migration20250428051844.js.map