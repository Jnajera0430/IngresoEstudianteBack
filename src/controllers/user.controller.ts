import { Body, Controller, Get, Put, Post, Delete,Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyExampleCreateUser } from 'src/document/body.document';
import { responseOkCreateUser, responseOkListUser } from 'src/document/responses.200';
import { responseErrorExampleCreateUser400 } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { RoleDto } from 'src/dto/roles/rol.dto';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('user')
@ApiTags("api-User")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({
        summary: "Create new user",
        description: 'Endpoint to create a new user',
        requestBody: {
            $ref: '#/components/schemas/CreateUserDto'
        }
    })
    @ApiBody(bodyExampleCreateUser())
    @ApiResponse(responseOkCreateUser())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    createUser(@Req() req: Request,@Body() newUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(newUser);
    }

    @Get()
    @ApiOperation({
        summary: "Users list",
        description: 'Endpoint to list all users',
    })
    @ApiResponse(responseOkListUser())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    allUser(@Req() req: Request): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findOneById(@Req() req: Request,id: number): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Put()
    update(@Req() req: Request, res: Response) {

    }

}
