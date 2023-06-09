import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from 'src/dto/auth/auth.dto';
import { Users } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private userServices: UserService,
        private jwtService: JwtService 
    ){}
    async login(userData: AuthUserDto):Promise<any> {
        const userFound: Users = await this.userServices.findOne(userData.email);
        //Arcodear la pass
        if(userFound.password !== userData.password){
            throw new UnauthorizedException();
        }
        const access_token = await this.jwtService.signAsync(userFound);
        return access_token;
    }
}
