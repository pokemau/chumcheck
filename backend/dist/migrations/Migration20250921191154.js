"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250101000000 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250101000000 extends migrations_1.Migration {
    async up() {
        this.addSql(`ALTER TABLE startups ADD COLUMN original_qualification_status smallint;`);
        this.addSql(`UPDATE startups SET original_qualification_status = qualification_status;`);
        this.addSql(`-- Check current data distribution
      SELECT qualification_status, COUNT(*) as count
      FROM startups 
      GROUP BY qualification_status
      ORDER BY qualification_status;`);
        this.addSql(`UPDATE startups 
      SET qualification_status = 1 
      WHERE original_qualification_status = 2;`);
        this.addSql(`UPDATE startups 
      SET qualification_status = 2 
      WHERE original_qualification_status = 4;`);
        this.addSql(`UPDATE startups 
      SET qualification_status = 1 
      WHERE original_qualification_status = 5;`);
        this.addSql(`-- Check data distribution after migration
      SELECT qualification_status, COUNT(*) as count
      FROM startups 
      GROUP BY qualification_status
      ORDER BY qualification_status;`);
    }
    async down() {
        this.addSql(`UPDATE startups 
      SET qualification_status = original_qualification_status;`);
        this.addSql(`ALTER TABLE startups DROP COLUMN original_qualification_status;`);
    }
}
exports.Migration20250101000000 = Migration20250101000000;
//# sourceMappingURL=Migration20250921191154.js.map