"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251006031136 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251006031136 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "startup_responses" drop constraint "startup_responses_assessment_assessment_id_foreign";`);
        this.addSql(`alter table "startup_responses" add constraint "startup_responses_assessment_assessment_id_foreign" foreign key ("assessment_assessment_id") references "assessments" ("assessment_id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table "startup_responses" drop constraint "startup_responses_assessment_assessment_id_foreign";`);
        this.addSql(`alter table "startup_responses" add constraint "startup_responses_assessment_assessment_id_foreign" foreign key ("assessment_assessment_id") references "assessments" ("assessment_id") on update cascade;`);
    }
}
exports.Migration20251006031136 = Migration20251006031136;
//# sourceMappingURL=Migration20251006031136.js.map