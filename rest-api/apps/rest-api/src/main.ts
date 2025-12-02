import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  // Crear aplicación HTTP normal
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el navegador
  app.enableCors();

  // Configurar prefijo global
  app.setGlobalPrefix('api');

  // Conectar microservicio RabbitMQ como híbrido
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'processing_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Iniciar todos los microservicios conectados
  await app.startAllMicroservices();

  // Iniciar servidor HTTP
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

bootstrap();
