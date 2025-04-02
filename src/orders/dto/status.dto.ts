import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';


export class StatusDto {
  @IsEnum(OrderStatus, {
    message: `status must be one of the following values: ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
