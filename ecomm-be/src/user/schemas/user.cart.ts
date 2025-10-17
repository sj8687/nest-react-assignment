import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { signModal } from 'src/auth/schemas/signup.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  // 🧠 This creates a relation with your login user (signModal)
  @Prop({ type: Types.ObjectId, ref: 'signModal', required: true })
  userId: Types.ObjectId | signModal;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
