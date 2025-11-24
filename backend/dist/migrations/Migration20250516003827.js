"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516003827 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516003827 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" rename column "isaigenerated" to "is_ai_generated";`);
    }
    async down() {
        this.addSql(`alter table "rns" rename column "is_ai_generated" to "isaigenerated";`);
    }
}
exports.Migration20250516003827 = Migration20250516003827;
//# sourceMappingURL=Migration20250516003827.js.map