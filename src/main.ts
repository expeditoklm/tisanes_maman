import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('LES TISANES DE MAMAN')
    .setDescription('API de gestion des tisanes de maman')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  // Démarrer le serveur après la configuration de Swagger
  await app.listen(3000);
}
bootstrap();
