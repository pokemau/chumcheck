"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251009090000 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251009090000 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "assessments" drop constraint if exists "assessments_assessment_type_id_foreign";');
        this.addSql('alter table "startup_assessments" drop constraint if exists "startup_assessments_assessment_type_id_foreign";');
        this.addSql('alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;');
        this.addSql('alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade on delete cascade;');
    }
    async down() {
        this.addSql('alter table "assessments" drop constraint if exists "assessments_assessment_type_id_foreign";');
        this.addSql('alter table "startup_assessments" drop constraint if exists "startup_assessments_assessment_type_id_foreign";');
        this.addSql('alter table "assessments" add constraint "assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;');
        this.addSql('alter table "startup_assessments" add constraint "startup_assessments_assessment_type_id_foreign" foreign key ("assessment_type_id") references "assessment_types" ("id") on update cascade;');
    }
}
exports.Migration20251009090000 = Migration20251009090000;
//# sourceMappingURL=Migration20251009090000.js.map