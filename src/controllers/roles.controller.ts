import { Controller,Body, Get,Post } from '@nestjs/common';
import {RolesService} from '../services/roles.service'
import {RoleDto} from '../dto//roles/rol.dto'
import { Role } from 'src/entitys/roles.entity';
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesServices: RolesService
    ){}

    @Get()
    async getAllRoles():Promise<Role[]>{
        return await this.rolesServices.getAllRoles();
    }

    @Get("get")
    async getRolByType(@Body() tipoRol: RoleDto):Promise<Role>{        
        return await this.rolesServices.getOneRolByType(tipoRol);
    }

    @Post()
    async createRol(@Body() rol: RoleDto):Promise<Role>{
        return await this.rolesServices.createRol(rol);
    }

}
