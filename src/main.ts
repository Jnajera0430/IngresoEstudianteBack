import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { configComponents } from './document/components.document';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  app.setGlobalPrefix("api");
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Ingreso Estudiantes API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Routes')
    .build();

  config.components = configComponents()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
