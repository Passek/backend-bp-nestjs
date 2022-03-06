import {  Controller, Delete, Get, Param, Post, UseGuards, Request} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './user.service';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get('')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAll(): Promise<any> {
    return await this.userService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':userId')
  @ApiParam({ name: 'userId' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Non Existent' })
  async getProductById(@Param('userId') userId): Promise<any> {
    return await this.userService.getUser(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('addToWishlist/:productId')
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Non Existent' })
  async addToWishlist(@Request() request, @Param('productId') productId): Promise<any> {
    return await this.userService.addToWishlist(request.user, productId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':userId')
  @ApiParam({ name: 'userId' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Non Existent' })

  async deleteOrders(@Param('userId') userId): Promise<any> {
    return await this.userService.deleteUser(userId);

  }
}


