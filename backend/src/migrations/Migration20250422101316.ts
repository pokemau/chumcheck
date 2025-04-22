import { Migration } from '@mikro-orm/migrations';

export class Migration20250422101316 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "email" varchar(255) not null, "hash" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "role" text check ("role" in ('Startup', 'Mentor', 'Manager')) not null default 'Startup');`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
