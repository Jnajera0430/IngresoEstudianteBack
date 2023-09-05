import { Controller,Body, Get,Post,HttpStatus } from '@nestjs/common';
import {RolesService} from '../services/roles.service'
import {RoleDto} from '../dto//roles/rol.dto'
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseOkListRoles, responseOkfindRolByType } from 'src/document/responses.200';
import { responseErrorExampleCreateUser400 } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { bodyExampleRoleDto } from 'src/document/body.document';
import { debug } from 'console';
import { ICustomResponse, customResponse } from 'src/services/customResponse.service';
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
    async getAllRoles():Promise<ICustomResponse>{
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'List roles.',
                data: await this.rolesServices.getAllRoles()
            })
        } catch (error) {
            debug(error);
            return error;
        }
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
    async getRolByType(@Body() tipoRol: RoleDto):Promise<ICustomResponse>{   
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Rol found by type.',
                data: await this.rolesServices.getOneRolByType(tipoRol)
            });
        } catch (error) {
            debug(error);
            return error;
        }     
    }

    @Post()
    @ApiOperation({
        summary: "Create new rol.",
        description: 'Endpoint to create a new rol',
    })
    @ApiBody(bodyExampleRoleDto(true))
    @ApiResponse(responseOkfindRolByType({
        message:'User created',
        status: 200
    }))
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer(),)
    async createRol(@Body() rol: RoleDto):Promise<ICustomResponse>{
       try {
           return customResponse({
               status: HttpStatus.CREATED,
               message: 'Rol has been created.',
               data: await this.rolesServices.createRol(rol)
           });
       } catch (error) {
            debug(error);
            return error;
       }
    }

}
