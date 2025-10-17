import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { signModal, SignupSchema } from 'src/auth/schemas/signup.schema';
import { Cart, CartSchema } from './schemas/user.cart';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: signModal.name, schema: SignupSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
