import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/enum/order.enum';

export class OrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: (args) =>
      `${args.value} is not a valid status, possible status values: ${OrderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus;
}
