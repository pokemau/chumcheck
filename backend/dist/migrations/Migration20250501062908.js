"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250501062908 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250501062908 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "startups_criterion_answers" ("id" serial primary key, "score" int not null, "remark" text null, "criterion_id" int not null, "startup_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
        this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_criterion_id_unique" unique ("startup_id", "criterion_id");`);
        this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_criterion_id_foreign" foreign key ("criterion_id") references "level_criteria" ("id") on update cascade;`);
        this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "startups_criterion_answers" cascade;`);
    }
}
exports.Migration20250501062908 = Migration20250501062908;
//# sourceMappingURL=Migration20250501062908.js.map