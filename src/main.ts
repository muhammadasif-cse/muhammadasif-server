import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { AppModule } from './app.module';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return serverless(expressApp);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const handler = bootstrap().then((app) => app);
