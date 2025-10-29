import { Migration } from '@mikro-orm/migrations';

export class Migration20251009100000 extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "initiatives" drop constraint if exists "initiatives_startup_id_foreign";');
    this.addSql('alter table "initiatives" add constraint "initiatives_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "initiatives" drop constraint if exists "initiatives_assignee_id_foreign";');
    this.addSql('alter table "initiatives" add constraint "initiatives_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "startups_criterion_answers" drop constraint if exists "startups_criterion_answers_startup_id_foreign";');
    this.addSql('alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "rna" drop constraint if exists "rna_startup_id_foreign";');
    this.addSql('alter table "rna" add constraint "rna_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "initiatives" drop constraint if exists "initiatives_startup_id_foreign";');
    this.addSql('alter table "initiatives" add constraint "initiatives_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "initiatives" drop constraint if exists "initiatives_assignee_id_foreign";');
    this.addSql('alter table "initiatives" add constraint "initiatives_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "startups_criterion_answers" drop constraint if exists "startups_criterion_answers_startup_id_foreign";');
    this.addSql('alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "rna" drop constraint if exists "rna_startup_id_foreign";');
    this.addSql('alter table "rna" add constraint "rna_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');
  }
}
