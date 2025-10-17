import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<signModal>;

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class signModal {
  @Prop({ required: false, })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const SignupSchema = SchemaFactory.createForClass(signModal);
