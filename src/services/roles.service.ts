import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entitys/roles.entity';
import { RoleDto } from 'src/dto/roles/rol.dto';


@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    ) { }

    async getAllRoles() {
        return await this.rolesRepository.find();
    }

    async getRolByType(tipoRoles: number[]):Promise<Role[]> {
        let roles: Role[]= [];
        for( const rol of tipoRoles){
            roles = [...roles, await this.rolesRepository.findOne({
                where:{
                    id: rol
                }
            })]
            
        }
        return  roles;
    }
    async findRolByid(id: number) {
        return await this.rolesRepository.findOneBy({ id })
    }

    async createRol(rol: RoleDto) {
        const rolCreated: Role = this.rolesRepository.create(rol);
        return await this.rolesRepository.save(rolCreated);
    }
}
