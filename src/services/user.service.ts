import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceEnv } from 'src/config/config.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { Users } from 'src/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private configServiceEnv: ConfigServiceEnv,
        @InjectRepository(Users) private userRepository: Repository<Users>
    ) { }

    async findAll(): Promise<Users[]> {
        return await this.userRepository.find();
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
        const createdUser = this.userRepository.create(newUser);
        return await this.userRepository.save(createdUser);
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
