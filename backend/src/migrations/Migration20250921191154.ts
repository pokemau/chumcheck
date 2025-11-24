import { Migration } from '@mikro-orm/migrations';

export class Migration20250101000000 extends Migration {
  override async up(): Promise<void> {
    // Add a backup column to track original values
    this.addSql(
      `ALTER TABLE startups ADD COLUMN original_qualification_status smallint;`,
    );

    // Copy current values to backup column
    this.addSql(
      `UPDATE startups SET original_qualification_status = qualification_status;`,
    );

    // Check current data distribution
    this.addSql(`-- Check current data distribution
      SELECT qualification_status, COUNT(*) as count
      FROM startups 
      GROUP BY qualification_status
      ORDER BY qualification_status;`);

    // Update RATED (2) to PENDING (1)
    this.addSql(`UPDATE startups 
      SET qualification_status = 1 
      WHERE original_qualification_status = 2;`);

    // Update REJECTED (4) to WHITELISTED (2)
    this.addSql(`UPDATE startups 
      SET qualification_status = 2 
      WHERE original_qualification_status = 4;`);

    // Update PAUSED (5) to PENDING (1)
    this.addSql(`UPDATE startups 
      SET qualification_status = 1 
      WHERE original_qualification_status = 5;`);

    // Verify the changes
    this.addSql(`-- Check data distribution after migration
      SELECT qualification_status, COUNT(*) as count
      FROM startups 
      GROUP BY qualification_status
      ORDER BY qualification_status;`);

    // Keep the backup column for now (you can remove it later)
    // this.addSql(`ALTER TABLE startups DROP COLUMN original_qualification_status;`);
  }

  override async down(): Promise<void> {
    // Restore original values using the backup column
    this.addSql(`UPDATE startups 
      SET qualification_status = original_qualification_status;`);

    // Remove the backup column
    this.addSql(
      `ALTER TABLE startups DROP COLUMN original_qualification_status;`,
    );
  }
}
