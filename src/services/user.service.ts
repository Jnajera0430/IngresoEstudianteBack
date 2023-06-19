import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceEnv } from 'src/config/config.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { RoleDto } from 'src/dto/roles/rol.dto';
import { Role } from 'src/entitys/roles.entity';

@Injectable()
export class UserService {
  constructor(
    private configServiceEnv: ConfigServiceEnv,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly rolesServices: RolesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['userRole'] });
  }
  async findOneByEmail(emailIngresado: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: emailIngresado,
      },
      loadRelationIds: {
        relations: ['role'],
      },
    });
  }
  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      loadRelationIds: {
        relations: ['role'],
      },
    });
  }
  async createUser(newUser: CreateUserDto): Promise<User> {
    try {
      const bcryptService: Bcrypt = new Bcrypt();
      newUser.password = await bcryptService.hashPassword(newUser.password);
      const user = this.userRepository.create(newUser);
      const roles: Role[] = await this.rolesServices.getRolByType(
        newUser.roles,
      );
      user.role = roles;
      const userCreated: User = await this.userRepository.save(user);
      console.log({ userCreated });
      return userCreated;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<any> {
    const userFound: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.delete(id);
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
