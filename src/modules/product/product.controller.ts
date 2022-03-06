import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { ProductPayload } from './product.payload';

@Controller('api/product')
@ApiTags('product')

export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post('')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: ProductPayload): Promise<any> {
    return await this.productService.create(payload);
  }

  @Get('')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAll(): Promise<any> {
    return await this.productService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':productId')
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Non Existent' })
  async getProductById(@Param('productId') productId): Promise<any> {
    return await this.productService.getProduct(productId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':productId')
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Non Existent' })

  async deleteOrders(@Param('productId') productId): Promise<any> {
    return await this.productService.deleteProduct(productId);

  }
}

