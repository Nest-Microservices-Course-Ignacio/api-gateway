import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  
  await app.listen(envs.port);

  Logger.log(`Server is running on: http://localhost:${envs.port}/api` , "API-GATEWAY");
}
bootstrap();
