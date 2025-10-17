import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/user.cart';
import { CreateProductDto } from './dto/user.cart';

@Injectable()
export class UserService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

   async addToCart(createProductDto: CreateProductDto, userId: string) {
    try {
      console.log(createProductDto);
      
      const product = new this.cartModel({ ...createProductDto, userId });
      return await product.save();
    } catch (error) {
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  async getUserProducts(userId: string) {
    return this.cartModel.find({ userId });
  }
}
