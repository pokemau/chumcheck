"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250523042350 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250523042350 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "scoring_guide" drop column "start_range", drop column "end_range";`);
    }
    async down() {
        this.addSql(`alter table "scoring_guide" add column "start_range" int not null, add column "end_range" int not null;`);
    }
}
exports.Migration20250523042350 = Migration20250523042350;
//# sourceMappingURL=Migration20250523042350.js.map