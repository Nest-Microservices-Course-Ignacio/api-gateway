import { Module } from '@nestjs/common';
import { NestClientModule } from 'src/transports/nest-client.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [NestClientModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
