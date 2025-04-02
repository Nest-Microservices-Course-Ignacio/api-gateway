import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { OrdersCommands } from 'src/common/cmd/orders.cmd';
import { Services } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(Services.ORDERS_SERVICE) private orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send(
      { cmd: OrdersCommands.CREATE_ORDER },
      createOrderDto,
    );
  }

  @Get()
  findAll() {
    return this.orderClient.send({ cmd: OrdersCommands.FIND_ALL_ORDERS }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderClient.send({ cmd: OrdersCommands.FIND_ONE_ORDER }, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderClient.send(
      { cmd: OrdersCommands.CHANGE_ORDER_STATUS },
      { id },
    );
  }
}
