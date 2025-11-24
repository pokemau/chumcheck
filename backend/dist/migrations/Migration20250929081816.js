"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250929081816 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250929081816 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "assessments" ("assessment_id" serial primary key, "assessment_type" smallint not null, "description" varchar(255) not null, "answer_type" smallint not null);`);
        this.addSql(`create table "startup_responses" ("id" serial primary key, "startup_id" int not null, "assessment_assessment_id" int not null, "answer_value" varchar(255) null, "submitted_at" date not null);`);
        this.addSql(`alter table "startup_responses" add constraint "startup_responses_assessment_assessment_id_foreign" foreign key ("assessment_assessment_id") references "assessments" ("assessment_id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "startup_responses" drop constraint "startup_responses_assessment_assessment_id_foreign";`);
        this.addSql(`drop table if exists "assessments" cascade;`);
        this.addSql(`drop table if exists "startup_responses" cascade;`);
    }
}
exports.Migration20250929081816 = Migration20250929081816;
//# sourceMappingURL=Migration20250929081816.js.map