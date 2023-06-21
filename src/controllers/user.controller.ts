import { Body, Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyExampleCreateUser } from 'src/document/body.document';
import { responseOkCreateUser } from 'src/document/responses.200';
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
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(newUser);
    }

    @Get()
    @ApiOperation({
        summary: "Users list",
        description: 'Endpoint to list all users',
    })
    @ApiResponse({
        status: 200,
        description: 'Users list with your type of roles',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/CreateUserDto'
                },
                example: {
                    "status": 200,
                    message: "list users",
                    data: [
                        {
                            "id": 21,
                            "email": "example4@gm.com",
                            "username": "exampleUser4",
                            "createdAt": "2023-06-17T07:37:49.159Z",
                            "state": true,
                            "role": [
                                {
                                    "id": 1,
                                    "tipo": "Super usuario"
                                }
                            ]
                        },
                        {
                            "id": 22,
                            "email": "example@gm.com",
                            "username": "exampleUser",
                            "createdAt": "2023-06-17T07:47:03.252Z",
                            "state": true,
                            "role": [
                                {
                                    "id": 1,
                                    "tipo": "Super usuario"
                                },
                                {
                                    "id": 2,
                                    "tipo": "Administrador"
                                },
                                {
                                    "id": 3,
                                    "tipo": "Auditor"
                                }
                            ]
                        },
                        {
                            "id": 24,
                            "email": "example5@gm.com",
                            "username": "exampleUser5",
                            "createdAt": "2023-06-21T02:39:22.479Z",
                            "state": true,
                            "role": [
                                {
                                    "id": 1,
                                    "tipo": "Super usuario"
                                }
                            ]
                        },
                        {
                            "id": 26,
                            "email": "example6@gm.com",
                            "username": "exampleUser6",
                            "createdAt": "2023-06-22T00:25:57.686Z",
                            "state": true,
                            "role": [
                                {
                                    "id": 1,
                                    "tipo": "Super usuario"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    })
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    allUser(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findOneById(id: number): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Put()
    update(req: Request, res: Response) {

    }

}
