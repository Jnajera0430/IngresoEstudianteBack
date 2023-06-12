import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, AuthUserRolDto,AuthUserRolFoundDto } from 'src/dto/auth/auth.dto';
import { Users } from 'src/entitys/user.entity';
import { Roles } from 'src/entitys/roles.entity';
import { UserService } from 'src/services/user.service';
import { UserRolesService } from 'src/services/user_roles.service';
import { RolesService } from 'src/services/roles.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UserService,
        private readonly userRoleServices: UserRolesService,
        private readonly rolesServices: RolesService,
        private jwtService: JwtService
    ) { }
    async login(userData: AuthUserDto): Promise<AuthUserRolFoundDto> {
        const userFound: Users = await this.userServices.findOne(userData.email);
        //Arcodear la pass
        if (!userFound) throw new NotFoundException("user not found");
        if (userFound.password !== userData.password)
            throw new UnauthorizedException();
        const userRol: AuthUserRolDto = await this.userRoleServices.findUserRolByIdUser(userFound.id);
        const rol:Roles = await this.rolesServices.findRolByid(userRol.idRol.id);
        return {
            token: await this.jwtService.signAsync(userFound),
            rol: rol.tipo
        }

    }
}
