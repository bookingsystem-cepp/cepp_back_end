import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'], // Specify the origin of your frontend application
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers your frontend might send
    preflightContinue: false, // Disable preflightContinue to send the appropriate headers in response to OPTIONS requests
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // app.useGlobalPipes(new ValidationPipe);

  await app.listen(8000);
}

bootstrap();