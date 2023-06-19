import { Body, Controller,Get ,Put, Post,Delete } from '@nestjs/common';
import { RoleDto } from 'src/dto/roles/rol.dto';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    createUser(@Body() newUser: CreateUserDto):Promise<User> {
        return this.userService.createUser(newUser);
    }

    @Get()
    allUser():Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(":id")
    findOneById(id: number):Promise<User>{
        return this.userService.findOneById(id);
    }

    @Put()
    update(req:Request, res:Response){

    }

}
