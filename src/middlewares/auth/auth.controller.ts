import { Body, Controller, HttpCode, HttpStatus, Post,Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/dto/auth/auth.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Atuh-user')
export class AuthController {
    constructor(
        private authService: AuthService
        ) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({
        description: 'Allowed user get a access-token in the cookies'
    })
    async signIn(@Body() userData: AuthUserDto, @Res() res:Response): Promise<any> {
        const token = await this.authService.login(userData);
        console.log({token});
        res.cookie("access-token", token,{
            maxAge: 84600,
            path:"/",
            secure: false,
            httpOnly: true
        });

        return
    }
    /*
    registrar usuario y iniciar session por hacer
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(userData: AuthUserDto): Promise<any> {
        return this.authService.signUp(userData);
    }*/
}
