import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserService } from './user.service';
import { CreateProductDto } from './dto/user.cart';

@Controller('cart')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Post('add')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user', 'admin')
    async createProduct(@Body() dto: CreateProductDto, @Req() req) {
        const userId = req.user.userId;
        console.log(userId);


        return this.UserService.addToCart(dto, userId);
    }


    @Get('my')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user', 'admin')
    async getUserProducts(@Req() req) {
        const userId = req.user.userId;
        return this.UserService.getUserProducts(userId);
    }
}
