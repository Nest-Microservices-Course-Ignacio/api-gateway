import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NestClientModule } from './transports/nest-client.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ProductsModule, OrdersModule, NestClientModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
