"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250616142724 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250616142724 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "capsule_proposals" add column "file_name" varchar(255) null;`);
    }
    async down() {
        this.addSql(`alter table "capsule_proposals" drop column "file_name";`);
    }
}
exports.Migration20250616142724 = Migration20250616142724;
//# sourceMappingURL=Migration20250616142724.js.map