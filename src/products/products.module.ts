import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { PRODUCTS_SERVICE } from 'src/config/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
