import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NestClientModule } from 'src/nest-client/nest-client.module';

@Module({
  imports: [NestClientModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
