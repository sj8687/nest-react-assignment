import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../schemas/signup.schema";


export class SignupDto {
      
    @IsOptional()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}