import { Migration } from '@mikro-orm/migrations';

export class Migration20251009093000 extends Migration {
  override async up(): Promise<void> {
    // Cascade for startup relations
    this.addSql('alter table "startups" drop constraint if exists "startups_user_id_foreign";');
    this.addSql('alter table "startups" add constraint "startups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "capsule_proposals" drop constraint if exists "capsule_proposals_startup_id_foreign";');
    this.addSql('alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "roadblocks" drop constraint if exists "roadblocks_startup_id_foreign";');
    this.addSql('alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "roadblocks" drop constraint if exists "roadblocks_assignee_id_foreign";');
    this.addSql('alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "rns" drop constraint if exists "rns_startup_id_foreign";');
    this.addSql('alter table "rns" add constraint "rns_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "rns" drop constraint if exists "rns_assignee_id_foreign";');
    this.addSql('alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "startups_readiness_level" drop constraint if exists "startups_readiness_level_startup_id_foreign";');
    this.addSql('alter table "startups_readiness_level" add constraint "startups_readiness_level_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "urat_question_answers" drop constraint if exists "urat_question_answers_startup_id_foreign";');
    this.addSql('alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "calculator_question_answers" drop constraint if exists "calculator_question_answers_startup_id_foreign";');
    this.addSql('alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade on delete cascade;');
  }

  override async down(): Promise<void> {
    // Revert to on update cascade only
    this.addSql('alter table "startups" drop constraint if exists "startups_user_id_foreign";');
    this.addSql('alter table "startups" add constraint "startups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "capsule_proposals" drop constraint if exists "capsule_proposals_startup_id_foreign";');
    this.addSql('alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "roadblocks" drop constraint if exists "roadblocks_startup_id_foreign";');
    this.addSql('alter table "roadblocks" add constraint "roadblocks_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');
    this.addSql('alter table "roadblocks" drop constraint if exists "roadblocks_assignee_id_foreign";');
    this.addSql('alter table "roadblocks" add constraint "roadblocks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "rns" drop constraint if exists "rns_startup_id_foreign";');
    this.addSql('alter table "rns" add constraint "rns_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');
    this.addSql('alter table "rns" drop constraint if exists "rns_assignee_id_foreign";');
    this.addSql('alter table "rns" add constraint "rns_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "startups_readiness_level" drop constraint if exists "startups_readiness_level_startup_id_foreign";');
    this.addSql('alter table "startups_readiness_level" add constraint "startups_readiness_level_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "urat_question_answers" drop constraint if exists "urat_question_answers_startup_id_foreign";');
    this.addSql('alter table "urat_question_answers" add constraint "urat_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');

    this.addSql('alter table "calculator_question_answers" drop constraint if exists "calculator_question_answers_startup_id_foreign";');
    this.addSql('alter table "calculator_question_answers" add constraint "calculator_question_answers_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;');
  }
}
