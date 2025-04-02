import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrdersCommands } from 'src/common/cmd/orders.cmd';

import { firstValueFrom } from 'rxjs';
import { ORDERS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enum/orderStatus.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
  findAll(@Query() orderPagination: OrderPaginationDto) {
    return this.orderClient.send(
      { cmd: OrdersCommands.FIND_ALL_ORDERS },
      orderPagination,
    );
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom<{ id: string }>(
        this.orderClient.send({ cmd: OrdersCommands.FIND_ONE_ORDER }, id),
      );
      return order;
    } catch (error) {
      Logger.error('Error fetching order by ID', this.constructor.name);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error);
    }
  }

  @Get(':status')
  findByOrderStatus(
    @Param('status') status: OrderStatus,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.orderClient.send(
      { cmd: OrdersCommands.FIND_BY_STATUS },
      { status, ...paginationDto },
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderClient.send(
      { cmd: OrdersCommands.CHANGE_ORDER_STATUS },
      { id, updateOrderDto },
    );
  }
}
