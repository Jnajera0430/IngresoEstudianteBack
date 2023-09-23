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
import { RoleEnumByTypeRole } from "src/constants/roles.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UserService,
        private readonly rolesServices: RolesService,
        private readonly jwtService: JwtService,
        private configServiceEnv: ConfigServiceEnv,

    ) { }
    /**
     * Returns the access-token of user logged
     * @param userData AuthUserDto
     * @returns Set-cookie
     */
    async login(userData: AuthUserDto): Promise<AuthLogin> {

        const bcrypt: Bcrypt = new Bcrypt()
        const userFound: User = await this.userServices.findOneByEmail(userData.email);

        //Arcodear la pass
        if (!userFound) throw new NotFoundException("email not found");
        if (!await bcrypt.comparePasswords(userData.password, userFound.password)) throw new HttpException(
            'Email or password does not match',
            HttpStatus.BAD_REQUEST,
        );

        const payload: TokenDto = {
            sub: userFound.id, user: {
                email: userFound.email,
                username: userFound.username,
                role: userFound.role.map(rol => ({ tipo: rol.tipo })),
            }
        }
        // const token = await this.jwtService.signAsync(payload, {
        //     expiresIn: 99999,
        // })
        //console.log(payload.user.role);

        for (const dataRol of userFound.role) {
            switch (dataRol.id) {
                default:
                    return {
                        rol: dataRol,
                        status: HttpStatus.OK,
                        message: "ok",
                        token: await this.jwtService.signAsync(payload, {
                            expiresIn: "100d",
                        }),
                        data: await this.jwtService.signAsync(payload, {
                            expiresIn: "1d",
                        }),
                    }
                case RoleEnumByTypeRole.PUESTO_DE_SERVICIO:
                    return {
                        status: HttpStatus.OK,
                        message: "ok",
                        token: await this.jwtService.signAsync(payload, {
                            expiresIn: "100d",
                        }),
                        data: await this.jwtService.signAsync(payload, {
                            expiresIn: "1d",
                        }),
                        rol: dataRol
                    }
            }
        }
    }
}
