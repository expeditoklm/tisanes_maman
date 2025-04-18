"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    app.useStaticAssets(uploadsPath, {
        prefix: '/uploads/',
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('LES TISANES DE MAMAN')
        .setDescription('API de gestion des tisanes de maman')
        .setVersion('1.0')
        .addTag('NestJS')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map