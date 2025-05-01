import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth/guards/auth.guard';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NestClientModule } from './transports/nest-client.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    NestClientModule,
  ],
  controllers: [AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
