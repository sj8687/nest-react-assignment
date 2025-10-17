import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Res, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './dto/image.upload.dto';
import { UpdateUploadDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image'))

  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDto,
  ) {

    try {
      if (!file) throw new BadRequestException('No file uploaded');

      const filePath = await this.adminService.uploadImage(file, dto.title, dto.price);

      return { message: 'File uploaded successfully', path: filePath };

    } catch (err) {
      console.error('Error upload');
      throw new BadRequestException('File upload failed');
    }

  }


  @Delete('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async deleteUpload(@Param('id') id: string) {
    try {
      const result = await this.adminService.deleteUpload(id);
      return { message: 'Image deleted successfully', result };
    } catch (err) {
      console.error('Error deleting image:', err.message);
      throw new BadRequestException(err.message || 'Failed to delete image');
    }

  }



  @Patch('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image'))
  async updateUpload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUploadDto,
  ) {
    try {
      const updated = await this.adminService.updateUpload(id, body, file);
      return { message: 'File updated successfully', updated };
    } catch (err) {
      console.error('Error updating upload');
      throw new BadRequestException('File update failed');
    }
  }



  




  @Get('all')
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }

 
}



