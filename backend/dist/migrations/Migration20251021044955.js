"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251021044955 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251021044955 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "activity_logs" ("id" serial primary key, "action" varchar(255) not null, "details" varchar(255) not null, "actor" varchar(255) null, "created_at" date not null);`);
        this.addSql(`alter table "assessments" drop constraint "assessments_assessment_type_id_foreign";`);
        this.addSql(`alter table "startup_assessments" drop constraint "startup_assessments_assessment_type_id_foreign";`);
        this.addSql(`alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table "startup_responses" drop column "file_name";`);
        this.addSql(`alter table "startup_responses" alter column "answer_value" type text using ("answer_value"::text);`);
    }
    async down() {
        this.addSql(`drop table if exists "activity_logs" cascade;`);
        this.addSql(`alter table "assessments" drop constraint "assessments_assessment_type_id_foreign";`);
        this.addSql(`alter table "startup_assessments" drop constraint "startup_assessments_assessment_type_id_foreign";`);
        this.addSql(`alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;`);
        this.addSql(`alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;`);
        this.addSql(`alter table "startup_responses" add column "file_name" varchar(255) null;`);
        this.addSql(`alter table "startup_responses" alter column "answer_value" type varchar(255) using ("answer_value"::varchar(255));`);
    }
}
exports.Migration20251021044955 = Migration20251021044955;
//# sourceMappingURL=Migration20251021044955.js.map