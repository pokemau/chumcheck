"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const postgresql_2 = require("@mikro-orm/postgresql");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const createConfig = () => {
    return (0, postgresql_1.defineConfig)({
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 5432),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        entities: ['./dist/**/*.entity.js'],
        entitiesTs: ['./src/**/*.entity.ts'],
        debug: true,
        driver: postgresql_2.PostgreSqlDriver,
        driverOptions: {
            connection: {
                ssl: { rejectUnauthorized: false },
            },
        },
    });
};
exports.default = createConfig();
//# sourceMappingURL=mikro-orm.config.js.map