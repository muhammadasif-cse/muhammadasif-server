import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Handler } from 'aws-lambda';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { AppModule } from './app.module';

async function bootstrap(): Promise<Handler> {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return serverless(expressApp);
}

export const handler = bootstrap();
