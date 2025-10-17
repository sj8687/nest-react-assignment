import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { UploadDocument, UploadModal } from './schema/image.schema';
import { Model } from 'mongoose';
import { UpdateUploadDto } from './dto/update-admin.dto';


@Injectable()
export class AdminService {
  @InjectModel(UploadModal.name) private uploadModel: Model<UploadDocument>;

  async uploadImage(file: Express.Multer.File, title: string, price: number): Promise<string> {

    try {

      const fileName = file.originalname;
      console.log(file);

      const uploadDir = join(process.cwd(), 'uploadfiles');
      const filePath = join(uploadDir, fileName);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(filePath, file.buffer);

      const created = new this.uploadModel({
        title,
        price,
        imagePath: fileName,
      });

      await created.save();

      return fileName;


    } catch (error) {
      console.error('Error saving file');
      throw new BadRequestException('Error uploading file');
    }
  }




  async deleteUpload(id: string) {
    try {
      const image = await this.uploadModel.findById(id);
      if (!image) throw new NotFoundException('Image not found');

      try {
        await fs.unlink(image.imagePath);
      } catch (fsErr) {
        console.warn('File not found');
      }

      await this.uploadModel.findByIdAndDelete(id);

      return { deletedId: id, deletedPath: image.imagePath };

    } catch (err) {
      console.error('Error deleting image');
      throw new BadRequestException('Error deleting image');
    }
  }




  async updateUpload(id: string, dto: UpdateUploadDto, file?: Express.Multer.File) {
    try {
      const upload = await this.uploadModel.findById(id);
      if (!upload) throw new NotFoundException('Upload not found');

      if (dto.title) upload.title = dto.title;
      if (dto.price !== undefined) upload.price = dto.price;

      if (file) {
        const uploadDir = join(process.cwd(), 'uploadfiles');
        await fs.mkdir(uploadDir, { recursive: true });

        if (upload.imagePath) {
          try {
            await fs.unlink(upload.imagePath);
          } catch {
            console.warn('file not found');
          }
        }

        const newFileName = file.originalname;

        const newFilePath = join(uploadDir, newFileName);
        await fs.writeFile(newFilePath, file.buffer);
        console.log(newFilePath);


        upload.imagePath = newFileName;
      }

      await upload.save();
      return upload;


    } catch (err) {
      console.error('Error updating upload');
      throw new BadRequestException('Error updating file');
    }
  }



  async getAllProducts() {
    return this.uploadModel.find()
  }



}
