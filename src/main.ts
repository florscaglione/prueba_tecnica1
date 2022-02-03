import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // con esto hacemos una validacion global para todos los endpoint. whitelist: elimina las propiedades que no han sido declaradas en nuestra clase DTO
  await app.listen(3000);
}
bootstrap();
