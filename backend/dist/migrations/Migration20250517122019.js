"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250517122019 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250517122019 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" drop column "target_level";`);
        this.addSql(`alter table "rns" add column "target_level_id" int not null;`);
        this.addSql(`alter table "rns" add constraint "rns_target_level_id_foreign" foreign key ("target_level_id") references "readiness_levels" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "rns" drop constraint "rns_target_level_id_foreign";`);
        this.addSql(`alter table "rns" drop column "target_level_id";`);
        this.addSql(`alter table "rns" add column "target_level" int not null;`);
    }
}
exports.Migration20250517122019 = Migration20250517122019;
//# sourceMappingURL=Migration20250517122019.js.map