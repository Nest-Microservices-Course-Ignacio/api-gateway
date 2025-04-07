import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NestClientModule } from 'src/nest-client/nest-client.module';

@Module({
  imports: [NestClientModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
