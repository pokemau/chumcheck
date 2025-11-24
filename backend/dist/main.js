"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'https://chumcheck.vercel.app/',
        ],
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map