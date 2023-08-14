import { Body, Controller, Get, Put, Post, Delete, Req, UseInterceptors, UploadedFile, Param, Patch } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyExampleCreateUser, bodyExampleUpdateUser } from 'src/document/body.document';
import { paramFindUser } from 'src/document/param.document';
import { responseOkCreateUser, responseOkListUser, responseOkfindUserById } from 'src/document/responses.200';
import { responseErrorExampleCreateUser400 } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import { AnyFilesInterceptor, FilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express';
@Controller('user')
@ApiTags("api-User")
export class UserController {
    constructor(private readonly userService: UserService,

    ) { }
    //documentar la request
    @Post()
    @ApiOperation({
        summary: "Create new user",
        description: 'Endpoint to create a new user',
    })
    @ApiBody(bodyExampleCreateUser())
    @ApiResponse(responseOkCreateUser())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    postCreateUser(@Req() req: Request, @Body() newUser: CreateUserDto): Promise<User> {
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
    getAllUser(@Req() req: Request): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "find user by id",
        description: 'Endpoint to search a user',
    })
    @ApiResponse(responseOkfindUserById())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    @ApiParam(paramFindUser())
    async getFindOneById(@Req() req: Request,@Param('id') id: number): Promise<User> {
        return await this.userService.findOneById(id);
    }

    @Patch()
    @ApiOperation({
        summary: "Update user",
        description: 'Endpoint to update user',
    })
    @ApiBody(bodyExampleUpdateUser())
    @ApiResponse(responseOkfindUserById())
    @ApiBadRequestResponse(responseErrorExampleCreateUser400())
    @ApiResponse(responseErrorServer())
    patchUpdate(@Req() req: Request, @Body() user: UpdateUserDto) {
        return this.userService.update(user.id, user);
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    postUploadFileUser(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        return this.userService.readFile(file);
    }
}
