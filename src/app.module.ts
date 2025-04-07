import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NestClientModule } from './nest-client/nest-client.module';

@Module({
  imports: [ProductsModule, OrdersModule, NestClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
