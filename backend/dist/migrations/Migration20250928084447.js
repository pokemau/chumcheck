"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250928084447 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250928084447 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" add column "ai_analysis_summary" text not null;`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" drop column "ai_analysis_summary";`);
    }
}
exports.Migration20250928084447 = Migration20250928084447;
//# sourceMappingURL=Migration20250928084447.js.map