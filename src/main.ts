import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

    
  // Augmenter la limite de taille pour les requêtes JSON
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  
  // Utilisez process.cwd() pour obtenir le répertoire de travail actuel
const uploadsPath = join(process.cwd(), 'uploads');
app.useStaticAssets(uploadsPath, {
  prefix: '/uploads/',
});
  // Configuration de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('LES TISANES DE MAMAN')
    .setDescription('API de gestion des tisanes de maman')
    .setVersion('1.0')
    .addTag('NestJS')
    .addBearerAuth() // Active l'authentification Bearer
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);


  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  // Démarrer le serveur après la configuration de Swagger
  await app.listen(3000);
}

bootstrap();
