import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { signModal, UserDocument } from './schemas/signup.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(signModal.name) private SignupSchema: Model<UserDocument>,
  ) { }

  async signup(dto: SignupDto) {
    const { name, email, password, role } = dto;

    try {
      const existingUser = await this.SignupSchema.findOne({ email });

      if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        console.log('Password match result:', isPasswordMatch);
        if (!isPasswordMatch) {
          throw new UnauthorizedException('Invalid password');
        }


        const token = this.jwtService.sign({
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
        });

        return {
          message: 'Login successful',
          token,
          role: existingUser.role,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.SignupSchema.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
      });

      const token = this.jwtService.sign({
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });

      return {
        message: 'Signup successful',
        token,
        role: newUser.role,
      };
    } catch (error) {

      console.error('Error in auth():', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
