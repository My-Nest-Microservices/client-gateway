import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  findAllProducts() {
    return this.productClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return 'Find one product #' + id;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return 'Update product #' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'Delete product #' + id;
  }
}
