import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_roles } from 'src/entitys/user_roles.entity';
import { Users } from 'src/entitys/user.entity';
import { Roles } from 'src/entitys/roles.entity';


@Injectable()
export class UserRolesService {
    constructor(
        @InjectRepository(User_roles) private readonly user_rolesRepository: Repository<User_roles>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
    ) { }

    async createRol(rol: bigint, user: bigint) {
    }
    async findUserRolByIdUser(idUser: number) {
        return await this.user_rolesRepository.findOne({
            where:{
                idUser:{
                    id:idUser
                }
            },
            relations:['idUser', 'idRol']
        })
    }

}
