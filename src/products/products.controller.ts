import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  findAllProducts() {
    return 'Find all products';
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
