import { Controller,Body, Get,Post } from '@nestjs/common';
import {RolesService} from '../services/roles.service'
import {RoleDto} from '../dto//roles/rol.dto'
import { Role } from 'src/entitys/roles.entity';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseOkListRoles, responseOkfindRolByType } from 'src/document/responses.200';
import { responseErrorExampleCreateUser400 } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { bodyExampleRoleDto } from 'src/document/body.document';
@Controller('roles')
@ApiTags('Api-Roles')
export class RolesController {
    constructor(
        private readonly rolesServices: RolesService
    ){}

    @Get()
    @ApiOperation({
        summary: "List roles",
        description: 'Endpoint to list all roles',
    })
    @ApiResponse(responseOkListRoles())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    async getAllRoles():Promise<Role[]>{
        return await this.rolesServices.getAllRoles();
    }

    @Get("get")
    @ApiOperation({
        summary: "Get rol",
        description: 'Endpoint to find role by type',
    })
    @ApiBody(bodyExampleRoleDto())
    @ApiResponse(responseOkfindRolByType({
        message:'User found',
        status: 200
    }))
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    async getRolByType(@Body() tipoRol: RoleDto):Promise<Role>{        
        return await this.rolesServices.getOneRolByType(tipoRol);
    }

    @Post()
    @ApiOperation({
        summary: "Create new rol",
        description: 'Endpoint to create a new rol',
    })
    @ApiBody(bodyExampleRoleDto(true))
    @ApiResponse(responseOkfindRolByType({
        message:'User created',
        status: 200
    }))
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer(),)
    async createRol(@Body() rol: RoleDto):Promise<Role>{
        return await this.rolesServices.createRol(rol);
    }

}
