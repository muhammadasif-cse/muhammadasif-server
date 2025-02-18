import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Handler } from 'aws-lambda'; // Import the Handler type for serverless functions
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

  // Wrap the Express app with serverless-http and return the handler
  return serverless(expressApp);
}

// Export the handler for Vercel
export const handler = bootstrap();
