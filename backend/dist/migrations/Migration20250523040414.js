"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250523040414 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250523040414 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "scoring_guide" ("id" serial primary key, "start_range" int not null, "end_range" int not null, "readiness_level_id" int not null, "description" text not null);`);
        this.addSql(`alter table "scoring_guide" add constraint "scoring_guide_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`drop table if exists "scoring_guide" cascade;`);
    }
}
exports.Migration20250523040414 = Migration20250523040414;
//# sourceMappingURL=Migration20250523040414.js.map