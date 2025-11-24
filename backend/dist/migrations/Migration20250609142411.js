"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250609142411 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250609142411 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "roadblocks" add column "clicked_by_mentor" boolean not null default false, add column "clicked_by_startup" boolean not null default false;`);
        this.addSql(`alter table "rns" alter column "is_ai_generated" type boolean using ("is_ai_generated"::boolean);`);
        this.addSql(`alter table "rns" alter column "is_ai_generated" set default false;`);
    }
    async down() {
        this.addSql(`alter table "roadblocks" drop column "clicked_by_mentor", drop column "clicked_by_startup";`);
        this.addSql(`alter table "rns" alter column "is_ai_generated" drop default;`);
        this.addSql(`alter table "rns" alter column "is_ai_generated" type boolean using ("is_ai_generated"::boolean);`);
    }
}
exports.Migration20250609142411 = Migration20250609142411;
//# sourceMappingURL=Migration20250609142411.js.map