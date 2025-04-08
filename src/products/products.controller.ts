import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductsCommands } from 'src/common/cmd/products.cmd';
import { ActiveRecordsDto } from 'src/common/dto/activeRecords.dto';
import { NATS_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Get()
  getAllProducts(@Query() pagination: ActiveRecordsDto) {
    return this.client.send(
      { cmd: ProductsCommands.FIND_ALL_PRODUCTS },
      pagination,
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await firstValueFrom<{ id: string }>(
        this.client.send(
          { cmd: ProductsCommands.FIND_ONE_PRODUCT },
          { id },
        ),
      );
      return product;
    } catch (error) {
      Logger.error('Error fetching product by ID', this.constructor.name);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error);
    }
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send(
      { cmd: ProductsCommands.CREATE_PRODUCT },
      createProductDto,
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client.send(
      { cmd: ProductsCommands.UPDATE_PRODUCT },
      { id: +id, ...updateProductDto },
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.client
      .send({ cmd: ProductsCommands.DELETE_PRODUCT }, { id })
      .pipe(
        /* This implementation is for Observables */
        catchError((err: Error | Record<string, unknown>) => {
          throw new RpcException(err);
        }),
      );
  }
  
}
