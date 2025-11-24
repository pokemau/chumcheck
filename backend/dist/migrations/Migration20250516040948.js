"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250516040948 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250516040948 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" add column "target_level" int not null;`);
        this.addSql(`alter table "rns" rename column "prioritynumber" to "priority_number";`);
    }
    async down() {
        this.addSql(`alter table "rns" drop column "target_level";`);
        this.addSql(`alter table "rns" rename column "priority_number" to "prioritynumber";`);
    }
}
exports.Migration20250516040948 = Migration20250516040948;
//# sourceMappingURL=Migration20250516040948.js.map