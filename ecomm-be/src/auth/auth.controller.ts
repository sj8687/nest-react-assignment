import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import type { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,

    ) { }


    @Post('signup')
    async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const createdUser = await this.authService.signup(dto);

        res.cookie('token', createdUser.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            message: createdUser.message,
            role: createdUser.role,
        };
    }


    @Get('me')
    async getCurrentUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        
        const token = req.cookies?.token;
                console.log(token);

        if (!token) return { user: null };

        try {
            const payload = this.jwtService.verify(token);
            console.log(payload);
            
            return { user: { email: payload.email, role: payload.role, id: payload.userId } };
        } catch (err) {
            return { user: null };
        }
    }


    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token');
        return { message: 'Logged out' };
    }




}
