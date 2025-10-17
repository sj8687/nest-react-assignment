import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UploadDocument = HydratedDocument<UploadModal>;

@Schema({ timestamps: true })
export class UploadModal {
  @Prop({ required: true })
  title: string;

   @Prop({ required: false })
  price: number;

  @Prop({ required: true })
  imagePath: string;
}

export const UploadSchema = SchemaFactory.createForClass(UploadModal);


