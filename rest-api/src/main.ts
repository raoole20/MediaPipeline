import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('REST API for files management')
    .setDescription('REST API for files management')
    .setVersion('0.0.1')
    .addTag('files')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000)
    .then(() => console.log(`Server running on port ${process.env.PORT}`))
    .catch((error) => console.error(error));
}

bootstrap();
