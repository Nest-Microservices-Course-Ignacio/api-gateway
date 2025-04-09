import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcCustomExceptionFilter } from './common/exceptions/rcp-exception.filter';
import { envs } from './config/envs';

async function bootstrap() {
  console.log('Starting API Gateway...');
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.setGlobalPrefix('/api');

  await app.listen(envs.port);

  Logger.log(
    `Server is running on: http://localhost:${envs.port}/api`,
    'API-GATEWAY',
  );
  
}
bootstrap();
