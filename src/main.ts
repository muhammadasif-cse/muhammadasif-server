import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('NestJS Server')
    .setDescription('The Server API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}

bootstrap();
