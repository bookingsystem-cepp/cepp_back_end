import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['*'],
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['*']
  })
  //app.useGlobalPipes(new ValidationPipe);

  await app.listen(8000);
}

bootstrap();