import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entitys/roles.entity';
import { RoleDto } from 'src/dto/roles/rol.dto';


@Injectable()
export class RolesService implements OnModuleInit {
    /**
     * Cosntructor of Service
     * @param rolesRepository 
     * Repository of typeorm of type Role
     */
    constructor(
        @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    ) { }
    /**
     * Returns a Role list
     * @returns Promise
     */
    async getAllRoles() {
        return await this.rolesRepository.find();
    }
    /**
     * Search role by type and returns a role
     * @param tipoRoles
     * Parameter tipoRole of type RoleDto 
     * @returns Promise
     */
    async getOneRolByType(tipoRole: RoleDto): Promise<Role> {
        return await this.rolesRepository.findOne({
            where: {
                tipo: tipoRole.tipo
            }
        });
    }
    /**
     * Search role by id and returns a Array role
     * @param tipoRoles
     * Parameter tipoRoles of type Array number 
     * @returns Promise
     */
    async getRolById(tipoRoles: number[]): Promise<Role[]> {
        let roles: Role[] = [];
        for (const rol of tipoRoles) {
            roles = [...roles, await this.rolesRepository.findOne({
                where: {
                    id: rol
                }
            })]

        }
        return roles;
    }

    /**
     * Search a role by id
     * @param id 
     * Paramater id of type number
     * @returns Promise
     */
    async findOneRolByid(id: number): Promise<Role> {
        return await this.rolesRepository.findOneBy({ id })
    }
    /**
     * Create a new Role
     * @param rol 
     * Parameter rol of type RoleDto
     * @returns Promise
     */
    async createRol(rol: RoleDto): Promise<Role> {
        const rolCreated: Role = this.rolesRepository.create(rol);
        return await this.rolesRepository.save(rolCreated);
    }

    async onModuleInit() {
        const roleCount: number = await this.rolesRepository.count();
        const rolesDefault: RoleDto[] = [
            {
                tipo:'Superusuario'
            },
            {
                tipo:'Administrador'
            },
            {
                tipo:'Auditor'
            },
            {
                tipo:'Puesto de servicio'
            },
        ]
        if (roleCount === 0) {
            for(let role of rolesDefault){
                this.createRol(role);
            }
            console.log('Roles: Created');
            
        }
    }
}
