import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, AuthUserRolDto, AuthUserRolFoundDto } from 'src/dto/auth/auth.dto';
import { Users } from 'src/entitys/user.entity';
import { Roles } from 'src/entitys/roles.entity';
import { UserService } from 'src/services/user.service';
import { RolesService } from 'src/services/roles.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UserService,
        private readonly rolesServices: RolesService,
        private jwtService: JwtService
    ) { }
    async login(userData: AuthUserDto): Promise<any> {
        const userFound: Users = await this.userServices.findOne(userData.email);
        //Arcodear la pass
        if (!userFound) throw new NotFoundException("user not found");
        if (userFound.password !== userData.password)
            throw new UnauthorizedException();
        return await this.jwtService.signAsync(userFound)    
    }
}
