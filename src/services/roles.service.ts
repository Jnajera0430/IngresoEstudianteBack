import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/entitys/roles.entity';
import { RoleDto } from 'src/dto/roles/rol.dto';


@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
    ) { }

    async getAllRoles() {
        return await this.rolesRepository.find();
    }

    async getRolByType(rol: RoleDto){
        return await this.rolesRepository.findOne({
            where: {
                tipo: rol.tipo
            }
        })
    }
    async findRolByid(id: number) {
        return await this.rolesRepository.findOneBy({ id })
    }

    async createRol(rol: RoleDto) {
        const rolCreated: Roles = this.rolesRepository.create(rol);
        return await this.rolesRepository.save(rolCreated);
    }
}
