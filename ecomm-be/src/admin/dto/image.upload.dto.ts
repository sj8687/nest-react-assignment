import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(({ value }) => Number(value))
   @IsNotEmpty()
  @IsNumber()
  price: number;
}
