import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceEnv } from 'src/config/config.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { Users } from 'src/entitys/user.entity';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { RoleDto } from 'src/dto/roles/rol.dto';
import { Roles } from 'src/entitys/roles.entity';

@Injectable()
export class UserService {
    constructor(
        private configServiceEnv: ConfigServiceEnv,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private readonly rolesServices: RolesService
    ) { }

    async findAll(): Promise<Users[]> {
        return await this.userRepository.find({relations:["userRole"]});
    }
    async findOne(emailIngresado: string): Promise<Users> {
        return await this.userRepository.findOne({
            where: {
                email: emailIngresado
            }
        });
    }
    async findOneById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }
    async createUser(newUser: CreateUserDto): Promise<Users> {
        try {
            const bcryptService: Bcrypt = new Bcrypt();
        newUser.password = await bcryptService.hashPassword(newUser.password);
        const user = this.userRepository.create(newUser);
        const userCreated:Users = await this.userRepository.save(user);
        const rol:Roles = await this.rolesServices.getRolByType(newUser.tipo);
        return userCreated;
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async delete(id: number): Promise<any> {
        const userFound: Users = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userFound) {
            throw new NotFoundException("User not found")
        }

        return await this.userRepository.delete(id);
    }

    async update(id: number, user: UpdateUserDto) {
        const userFound: Users = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userFound) {
            throw new NotFoundException("User not found")
        }
        await this.userRepository.update(id, user);
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
