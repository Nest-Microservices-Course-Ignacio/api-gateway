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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send(
      { cmd: OrdersCommands.CREATE_ORDER },
      createOrderDto,
    );
  }

  @Get()
  findAll(@Query() orderPagination: OrderPaginationDto) {
    try {
      return this.client.send(
        { cmd: OrdersCommands.FIND_ALL_ORDERS },
        orderPagination,
      );
    } catch (error) {
      Logger.error('Error fetching all orders', this.constructor.name);
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom<{ id: string }>(
        this.client.send({ cmd: OrdersCommands.FIND_ONE_ORDER }, id),
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
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.client.send(
      { cmd: OrdersCommands.FIND_BY_STATUS },
      { status: statusDto.status, ...paginationDto },
    );
  }

  @Patch(':id')
  changeOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.client.send(
      { cmd: OrdersCommands.CHANGE_ORDER_STATUS },
      { id, status: statusDto.status },
    );
  }
}
