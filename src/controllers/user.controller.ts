import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
  ParseIntPipe,
  UploadedFiles,
  HttpStatus,
  Query
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  bodyExampleCreateUser,
  bodyExampleUpdateUser,
} from 'src/document/body.document';
import { paramFindUser } from 'src/document/param.document';
import {
  responseOkCreateUser,
  responseOkListUser,
  responseOkfindUserById,
} from 'src/document/responses.200';
import { responseErrorExampleCreateUser400 } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';
import {
  FilesInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Request, Express } from 'express';
import { customResponse } from 'src/services/customResponse.service';
import { debug } from 'console';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
@Controller('user')
@ApiTags('api-User')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  //documentar la request
  @Post()
  @ApiOperation({
    summary: 'Create new user',
    description: 'Endpoint to create a new user',
  })
  @ApiBody(bodyExampleCreateUser())
  @ApiResponse(responseOkCreateUser())
  @ApiBadRequestResponse(responseErrorExampleCreateUser400())
  @ApiResponse(responseErrorServer())
  async postCreateUser(
    @Req() req: Request,
    @Body() newUser: CreateUserDto,
  ): Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.CREATED,
        message: 'User has been created',
        data: await this.userService.createUser(newUser)
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Users list',
    description: 'Endpoint to list all users',
  })
  @ApiResponse(responseOkListUser())
  @ApiBadRequestResponse(responseErrorExampleCreateUser400())
  @ApiResponse(responseErrorServer())
  async getAllUser(@Query() pageOptionsDto:PageOptionsDto): Promise<ICustomResponse> {
    try {
      const {data,meta} = await this.userService.findAll(pageOptionsDto);
      return customResponse({
        status: HttpStatus.OK,
        message: 'List users',
        data,
        meta
      });
    } catch (error) {
      debug(error);
      return error;     
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'find user by id',
    description: 'Endpoint to search a user',
  })
  @ApiResponse(responseOkfindUserById())
  @ApiBadRequestResponse(responseErrorExampleCreateUser400())
  @ApiResponse(responseErrorServer())
  @ApiParam(paramFindUser())
  async getFindOneById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.OK,
        message: 'User found by id.',
        data: await this.userService.findOneById(id)
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Patch()
  @ApiOperation({
    summary: 'Update user',
    description: 'Endpoint to update user',
  })
  @ApiBody(bodyExampleUpdateUser())
  @ApiResponse(responseOkfindUserById())
  @ApiBadRequestResponse(responseErrorExampleCreateUser400())
  @ApiResponse(responseErrorServer())
  async patchUpdate(@Req() req: Request, @Body() user: UpdateUserDto):Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.CREATED,
        message: 'User has been updated.',
        data: await this.userService.update(user.id, user)
      })
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async postUploadFileUser(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.userService.readFile(file);
    } catch (error) {
      debug(error);
      return error;
    }
  }
  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files'))
  async postUploadFilesUser(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      return await this.userService.readFiles(files);
    } catch (error) {
      debug(error);
      return error;
    }
  }
}
