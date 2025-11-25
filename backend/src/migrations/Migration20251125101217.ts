import { Migration } from '@mikro-orm/migrations';

export class Migration20251125101217 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "urat_question_answers" drop constraint "urat_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_startup_id_foreign";`);

    this.addSql(`alter table "rna" drop constraint "rna_startup_id_foreign";`);

    this.addSql(`alter table "startups_readiness_level" drop constraint "startups_readiness_level_startup_id_foreign";`);

    this.addSql(`alter table "startups_criterion_answers" drop constraint "startups_criterion_answers_startup_id_foreign";`);

    this.addSql(`alter table "elevate_logs" drop constraint "elevate_logs_startup_id_foreign";`);

    this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "roadblocks" drop constraint "roadblocks_startup_id_foreign";`);

    this.addSql(`alter table "rns" drop constraint "rns_startup_id_foreign";`);

    this.addSql(`alter table "initiatives" drop constraint "initiatives_startup_id_foreign";`);

    this.addSql(`alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "rna" add constraint "rna_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "startups_readiness_level" add constraint "startups_readiness_level_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "elevate_logs" add constraint "elevate_logs_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "rns" add constraint "rns_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "urat_question_answers" drop constraint "urat_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "startup_waitlist_messages" drop constraint "startup_waitlist_messages_startup_id_foreign";`);

    this.addSql(`alter table "rna" drop constraint "rna_startup_id_foreign";`);

    this.addSql(`alter table "startups_readiness_level" drop constraint "startups_readiness_level_startup_id_foreign";`);

    this.addSql(`alter table "startups_criterion_answers" drop constraint "startups_criterion_answers_startup_id_foreign";`);

    this.addSql(`alter table "elevate_logs" drop constraint "elevate_logs_startup_id_foreign";`);

    this.addSql(`alter table "calculator_question_answers" drop constraint "calculator_question_answers_startup_id_foreign";`);

    this.addSql(`alter table "roadblocks" drop constraint "roadblocks_startup_id_foreign";`);

    this.addSql(`alter table "rns" drop constraint "rns_startup_id_foreign";`);

    this.addSql(`alter table "initiatives" drop constraint "initiatives_startup_id_foreign";`);

    this.addSql(`alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "startup_waitlist_messages" add constraint "startup_waitlist_messages_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "rna" add constraint "rna_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "startups_readiness_level" add constraint "startups_readiness_level_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "startups_criterion_answers" add constraint "startups_criterion_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "elevate_logs" add constraint "elevate_logs_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "rns" add constraint "rns_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);

    this.addSql(`alter table "initiatives" add constraint "initiatives_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
  }

}
