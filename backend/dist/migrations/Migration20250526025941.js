"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250526025941 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250526025941 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "rna" ("id" serial primary key, "readiness_level_id" int not null, "startup_id" int not null, "is_ai_generated" boolean not null, "rna" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
        this.addSql(`alter table "rna" add constraint "rna_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`);
        this.addSql(`alter table "rna" add constraint "rna_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
        this.addSql(`drop table if exists "startup_rnas" cascade;`);
    }
    async down() {
        this.addSql(`create table "startup_rnas" ("id" serial primary key, "readiness_level_id" int not null, "startup_id" int not null, "is_ai_generated" boolean not null, "rna" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
        this.addSql(`alter table "startup_rnas" add constraint "startup_rnas_readiness_level_id_foreign" foreign key ("readiness_level_id") references "readiness_levels" ("id") on update cascade;`);
        this.addSql(`alter table "startup_rnas" add constraint "startup_rnas_startup_id_foreign" foreign key ("startup_id") references "startups" ("id") on update cascade;`);
        this.addSql(`drop table if exists "rna" cascade;`);
    }
}
exports.Migration20250526025941 = Migration20250526025941;
//# sourceMappingURL=Migration20250526025941.js.map