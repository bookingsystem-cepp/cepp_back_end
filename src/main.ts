import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(cors());

  app.use(cors({
    origin: '*', // Allow requests from all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specified headers
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));

  await app.listen(8000);
}

bootstrap();