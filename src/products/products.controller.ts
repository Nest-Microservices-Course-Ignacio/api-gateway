import { Controller, Patch } from '@nestjs/common';
import { Get, Post, Delete, Param, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  getAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return `This action returns the product with id: ${id}`;
  }

  @Post()
  createProduct(@Body() createProductDto: any) {
    return `This action creates a new product with the following data: ${JSON.stringify(createProductDto)}`;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return `This action updates the product with id: ${id} with the following data: ${JSON.stringify(updateProductDto)}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action deletes the product with id: ${id}`;
  }
}
