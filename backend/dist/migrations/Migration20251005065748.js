"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251005065748 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251005065748 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "assessment_types" ("id" serial primary key, "assessment_type" varchar(255) not null);`);
        this.addSql(`alter table "assessments" drop column "assessment_type";`);
        this.addSql(`alter table "assessments" add column "assessment_type_id" int not null;`);
        this.addSql(`alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;`);
        this.addSql(`alter table "startup_assessments" drop column "assessment_type";`);
        this.addSql(`alter table "startup_assessments" add column "assessment_type_id" int not null;`);
        this.addSql(`alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "assessments" drop constraint "assessments_assessment_type_id_foreign";`);
        this.addSql(`alter table "startup_assessments" drop constraint "startup_assessments_assessment_type_id_foreign";`);
        this.addSql(`drop table if exists "assessment_types" cascade;`);
        this.addSql(`alter table "assessments" drop column "assessment_type_id";`);
        this.addSql(`alter table "assessments" add column "assessment_type" smallint not null;`);
        this.addSql(`alter table "startup_assessments" drop column "assessment_type_id";`);
        this.addSql(`alter table "startup_assessments" add column "assessment_type" smallint not null;`);
    }
}
exports.Migration20251005065748 = Migration20251005065748;
//# sourceMappingURL=Migration20251005065748.js.map