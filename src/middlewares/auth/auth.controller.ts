import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiUnauthorizedResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/dto/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { bodyExampleAuthUser } from 'src/document/body.document';
import { responseOkAuthUser } from 'src/document/responses.200';
import { responseErrorExampleAuthUser } from 'src/document/responses.400';

@Controller('auth')
@ApiTags('Auth-user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtServices: JwtService,
  ) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: "Authenticate the user to log in to the application",
    description: 'sending the access-token for authenticate ',

  })
  @ApiBody(bodyExampleAuthUser())
  @ApiOkResponse(responseOkAuthUser())
  @ApiUnauthorizedResponse(responseErrorExampleAuthUser())
  async signIn(@Res({ passthrough: true }) response: Response, @Body() userData: AuthUserDto): Promise<Object> { 
    const { token, rol } = await this.authService.login(userData);
    switch (rol) {
      default:
        response.cookie("access_token", token, {
          httpOnly: true,
          path: '/',
          secure: true,
          maxAge: 86400,
          sameSite: "strict",
          domain:'localhost'
        });
        break;
      case 'Puesto de servicio':
        response.cookie("access_token", token, {
          httpOnly: true,
          path: '/',
          secure: true,
          maxAge: null,
          expires: null,
          sameSite: "strict",
          domain:'localhost'
        });
        break;
    }
    return;
  }
  /*
    registrar usuario e iniciar session 
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(userData: AuthUserDto): Promise<any> {
        return this.authService.signUp(userData);
    }*/
}
