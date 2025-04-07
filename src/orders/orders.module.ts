import { Module } from '@nestjs/common';
import { NestClientModule } from 'src/transports/nest-client.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [NestClientModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
