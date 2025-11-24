"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250428205851 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250428205851 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);
        this.addSql(`alter table "calculator_question_answers" alter column "startup_id" type int using ("startup_id"::int);`);
        this.addSql(`alter table "calculator_question_answers" alter column "startup_id" set not null;`);
        this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);
        this.addSql(`alter table "calculator_question_answers" alter column "startup_id" type int using ("startup_id"::int);`);
        this.addSql(`alter table "calculator_question_answers" alter column "startup_id" drop not null;`);
        this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on delete cascade;`);
    }
}
exports.Migration20250428205851 = Migration20250428205851;
//# sourceMappingURL=Migration20250428205851.js.map