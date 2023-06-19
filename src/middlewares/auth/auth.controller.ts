import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/dto/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Atuh-user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtServices: JwtService,
  ) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    description: 'sending the access-token for authenticate ',
  })
  @ApiBody({
    type: AuthUserDto,
    description: 'Values required for Authenticate',
    examples: {
      example1: {
        value: {
          email: 'example@gm.com',
          password: 'sena123',
        },
        summary: 'Example of values required',
      },
    },
  })
  async signIn(@Res({ passthrough: true }) response: Response, @Body() userData: AuthUserDto): Promise<Object> {
    const { token, rol } = await this.authService.login(userData);
    switch (rol) {
      case 'Super usuario' || 'Administrador' || 'Auditor':
        response.cookie("access_token", token, {
          httpOnly: true,
          path: '/',
          secure: true,
          maxAge: 86400,
        });
        break;
      case 'Puesto de servicio':
        response.cookie("access_token", token, {
          httpOnly: true,
          path: '/',
          secure: true,
          maxAge: null,
          expires: null
        });
        break;
    }
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
