"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250625025145 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625025145 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "initiatives" drop constraint "initiatives_rns_id_foreign";`);
        this.addSql(`alter table "initiatives" add constraint "initiatives_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table "initiatives" drop constraint "initiatives_rns_id_foreign";`);
        this.addSql(`alter table "initiatives" add constraint "initiatives_rns_id_foreign" foreign key ("rns_id") references "rns" ("id") on update cascade;`);
    }
}
exports.Migration20250625025145 = Migration20250625025145;
//# sourceMappingURL=Migration20250625025145.js.map