"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251005070039 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251005070039 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "assessment_types" rename column "assessment_type" to "type";`);
    }
    async down() {
        this.addSql(`alter table "assessment_types" rename column "type" to "assessment_type";`);
    }
}
exports.Migration20251005070039 = Migration20251005070039;
//# sourceMappingURL=Migration20251005070039.js.map