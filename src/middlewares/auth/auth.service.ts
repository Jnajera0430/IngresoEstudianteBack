import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, AuthUserRolDto, AuthUserRolFoundDto } from 'src/dto/auth/auth.dto';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { User } from 'src/entitys/user.entity';
import { Role } from 'src/entitys/roles.entity';
import { UserService } from 'src/services/user.service';
import { RolesService } from 'src/services/roles.service';
import { ConfigServiceEnv } from 'src/config/config.service';
import { AuthLogin, TokenDto } from 'src/dto/user/user.dto';

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
        if (!userFound) throw new NotFoundException("user not found");
        if (!await bcrypt.comparePasswords(userData.password, userFound.password)){
            throw new UnauthorizedException("Email or password not found");
        }
        const payload:TokenDto = {sub: userFound.id, user:userFound}
        return {
            token : await this.jwtService.signAsync(payload),
            roles: userFound.role
        }
    }
}
