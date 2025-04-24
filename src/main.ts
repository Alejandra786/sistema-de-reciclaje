import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Sistema de reciclaje')
    .setDescription(
      'API REST para el sistema de reciclaje que permite la gestión integral de usuarios, puntos de reciclaje, materiales reciclables, impactos ambientales, recompensas, roles y permisos. Proporciona endpoints seguros para realizar operaciones CRUD, registrar acciones ecológicas y facilitar procesos de canje mediante un sistema de puntos acumulados por reciclaje.',
    )    
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestsDuration: true,
    },
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
