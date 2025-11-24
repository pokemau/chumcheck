"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250608024122 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250608024122 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "rns" add column "clicked_by_startup" boolean not null default false;`);
        this.addSql(`alter table "rns" rename column "is_new" to "clicked_by_mentor";`);
        this.addSql(`alter table "initiatives" add column "clicked_by_startup" boolean not null default false;`);
        this.addSql(`alter table "initiatives" rename column "is_new" to "clicked_by_mentor";`);
    }
    async down() {
        this.addSql(`alter table "rns" drop column "clicked_by_startup";`);
        this.addSql(`alter table "rns" rename column "clicked_by_mentor" to "is_new";`);
        this.addSql(`alter table "initiatives" drop column "clicked_by_startup";`);
        this.addSql(`alter table "initiatives" rename column "clicked_by_mentor" to "is_new";`);
    }
}
exports.Migration20250608024122 = Migration20250608024122;
//# sourceMappingURL=Migration20250608024122.js.map