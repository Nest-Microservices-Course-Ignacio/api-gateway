import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NestClientModule } from './transports/nest-client.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from './config/envs';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    NestClientModule,
    JwtModule.register({
      global: true,
      secret: envs.jwtConst,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
