import { Injectable, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/dto/auth/auth.dto';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { User } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import { RolesService } from 'src/services/roles.service';
import { ConfigServiceEnv } from 'src/config/config.service';
import { AuthLogin, TokenDto } from 'src/dto/user/user.dto';
import { roleEnum } from 'src/dto/roles/rol.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UserService,
        private readonly rolesServices: RolesService,
        private readonly jwtService: JwtService,
        private configServiceEnv: ConfigServiceEnv,

    ) { }
    async login(userData: AuthUserDto): Promise<AuthLogin> {
        const bcrypt: Bcrypt = new Bcrypt()
        const userFound: User = await this.userServices.findOneByEmail(userData.email);
        //Arcodear la pass
        if (!userFound) throw new NotFoundException("email not found");
        if (!await bcrypt.comparePasswords(userData.password, userFound.password)) {
            throw new HttpException(
                'Email or password does not match',
                HttpStatus.UNAUTHORIZED,
            );
        }
        const payload: TokenDto = { sub: userFound.id, user: userFound }

        for (const idRol of userFound.role) {
            let rol = roleEnum[`${idRol}`]; 
            switch (roleEnum[`${idRol}`]) {
                case 'Super usuario' || 'Administrador' || 'Auditor':
                    return {
                        token: await this.jwtService.signAsync(payload, {
                            expiresIn: 99999,
                        }),
                        rol
                    }
                case 'Puesto de servicio':
                    return {
                        token: await this.jwtService.signAsync(payload, {
                            expiresIn: null,
                        }),
                        rol 
                    }
            }
        }
    }
}
