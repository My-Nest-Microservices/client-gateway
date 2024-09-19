import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

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
  findOneProduct() {
    return 'Find one product';
  }

  @Patch(':id')
  updateProduct() {
    return 'Update product';
  }

  @Delete(':id')
  deleteProduct() {
    return 'Delete product';
  }
}
