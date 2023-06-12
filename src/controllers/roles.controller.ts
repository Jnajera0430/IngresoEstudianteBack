import { Controller,Body, Get,Post } from '@nestjs/common';
import {RolesService} from '../services/roles.service'
import {RoleDto} from '../dto//roles/rol.dto'
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesServices: RolesService
    ){}
    @Get()
    async getAllRoles(){
        return await this.rolesServices.getAllRoles();
    }

    @Get("get")
    async getRolByType(@Body() rol: string){        
        return await this.rolesServices.getRolByType(rol);
    }

    @Post()
    async createRol(@Body() rol: RoleDto){
        return await this.rolesServices.createRol(rol);
    }

}
