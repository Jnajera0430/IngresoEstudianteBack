import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { configComponents } from './document/components.document';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.HOST_FRONT,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials', 'Accept'],
    preflightContinue: false,
  },);

  dotenv.config()
  //prefijo para la consulta en la api
  // app.setGlobalPrefix("api");

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }),)

  //config of swagger
  const config = new DocumentBuilder()
    .setTitle('PIA API')
    .setDescription('Api documentation')
    .setVersion('1.0')
    .addTag('Routes')
    .build();

  config.components = configComponents()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
