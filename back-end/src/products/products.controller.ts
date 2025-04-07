import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { Prisma } from '@prisma/client';
  
  @Controller('products')
  export class ProductsController {
    constructor(private productService: ProductsService) {}
  
    @Get()
    getAll() {
      return this.productService.findAll();
    }
  
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
      return this.productService.findOne(id);
    }
  
    @Post()
    create(@Body() data: Prisma.ProductCreateInput) {
      return this.productService.create(data);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.ProductUpdateInput) {
      return this.productService.update(id, data);
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.productService.delete(id);
    }
  }
  