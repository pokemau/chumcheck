"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250423022847 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250423022847 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "calculator_questions" ("id" serial primary key, "question" varchar(255) not null, "score" int not null, "category" text check ("category" in ('Technology', 'Product Development', 'Product Definition Design', 'Competitive Landscape', 'Team', 'Go-To-Market', 'Manufacturing Supply Chain')) not null);`);
        this.addSql(`create table "urat_questions" ("id" serial primary key, "question" varchar(255) not null, "readiness_type" text check ("readiness_type" in ('Technology', 'Market', 'Acceptance', 'Organizational', 'Regulatory', 'Investment')) not null);`);
        this.addSql(`create table "users" ("id" serial primary key, "email" varchar(255) not null, "hash" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "role" text check ("role" in ('Startup', 'Mentor', 'Manager')) not null default 'Startup');`);
        this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
        this.addSql(`create table "startups" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null, "qualification_status" smallint not null default 1, "data_privacy" boolean not null default false, "links" text null, "group_name" varchar(100) null, "university_name" varchar(100) null, "eligibility" boolean not null default false);`);
        this.addSql(`create table "capsule_proposals" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "problem_statement" varchar(255) not null, "target_market" varchar(255) not null, "solution_description" varchar(255) not null, "objectives" varchar(255) not null, "scope" varchar(255) not null, "methodology" varchar(255) not null, "startup_id" int not null);`);
        this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_unique" unique ("startup_id");`);
        this.addSql(`alter table "startups" add constraint "startups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
        this.addSql(`alter table "capsule_proposals" add constraint "capsule_proposals_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "startups" drop constraint "startups_user_id_foreign";`);
        this.addSql(`alter table "capsule_proposals" drop constraint "capsule_proposals_startup_id_foreign";`);
        this.addSql(`drop table if exists "calculator_questions" cascade;`);
        this.addSql(`drop table if exists "urat_questions" cascade;`);
        this.addSql(`drop table if exists "users" cascade;`);
        this.addSql(`drop table if exists "startups" cascade;`);
        this.addSql(`drop table if exists "capsule_proposals" cascade;`);
    }
}
exports.Migration20250423022847 = Migration20250423022847;
//# sourceMappingURL=Migration20250423022847.js.map