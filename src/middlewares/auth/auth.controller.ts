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
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/dto/user/user.dto';
import { roleEnum } from 'src/dto/roles/rol.dto';

@Controller('auth')
@ApiTags('Atuh-user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtServices: JwtService,
  ) {}
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
          email: 'johndoe@example.com',
          password: 'password123',
        },
        summary: 'Example of values required',
      },
    },
  })
  async signIn(@Body() userData: AuthUserDto): Promise<Object> {
    const { token } = await this.authService.login(userData);
    return { access_token: token };
  }
  /*
    registrar usuario y iniciar session por hacer
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(userData: AuthUserDto): Promise<any> {
        return this.authService.signUp(userData);
    }*/
}
