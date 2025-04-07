import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NestClientModule } from './transports/nest-client.module';

@Module({
  imports: [ProductsModule, OrdersModule, NestClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
