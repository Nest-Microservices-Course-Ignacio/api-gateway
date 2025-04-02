import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrdersCommands } from 'src/common/cmd/orders.cmd';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDERS_SERVICE } from 'src/config/services';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private orderClient: ClientProxy) {}

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
  async findOne(@Param('id') id: string) {
    try {
      const order = await firstValueFrom<{ id: string }>(
        this.orderClient.send({ cmd: OrdersCommands.FIND_ONE_ORDER }, id),
      );
      return order;
    } catch (error) {
      Logger.error('Error fetching order by ID', this.constructor.name);
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderClient.send(
      { cmd: OrdersCommands.CHANGE_ORDER_STATUS },
      { id, updateOrderDto },
    );
  }
}
