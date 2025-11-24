"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20251027140240_add_members_to_capsule_proposals = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20251027140240_add_members_to_capsule_proposals extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" add column "members" jsonb not null;`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" drop column "members";`);
    }
}
exports.Migration20251027140240_add_members_to_capsule_proposals = Migration20251027140240_add_members_to_capsule_proposals;
//# sourceMappingURL=Migration20251027140240_add_members_to_capsule_proposals.js.map