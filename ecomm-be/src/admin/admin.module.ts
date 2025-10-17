import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModal, UploadSchema } from './schema/image.schema';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: UploadModal.name, schema: UploadSchema }]),

  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
