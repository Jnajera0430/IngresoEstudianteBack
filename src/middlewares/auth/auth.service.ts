import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, AuthUserRolDto, AuthUserRolFoundDto } from 'src/dto/auth/auth.dto';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { Users } from 'src/entitys/user.entity';
import { Roles } from 'src/entitys/roles.entity';
import { UserService } from 'src/services/user.service';
import { RolesService } from 'src/services/roles.service';
import { ConfigServiceEnv } from 'src/config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UserService,
        private readonly rolesServices: RolesService,
        private readonly jwtService: JwtService,
        private configServiceEnv: ConfigServiceEnv,
        
    ) { }
    async login(userData: AuthUserDto): Promise<any> {
        const bcrypt: Bcrypt = new Bcrypt()
        const userFound: Users = await this.userServices.findOneByEmail(userData.email);
        console.log(await bcrypt.comparePasswords(userData.password, userFound.password));
        //Arcodear la pass
        if (!userFound) throw new NotFoundException("user not found");
        if (!await bcrypt.comparePasswords(userData.password, userFound.password)){
            throw new UnauthorizedException("Email or password not found");
        }

        const payload = {sub: userFound.id, userFound}
        return await this.jwtService.signAsync(payload);
    }
}
