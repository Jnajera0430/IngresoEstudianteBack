import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceEnv } from 'src/config/config.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { DeleteResult, Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { RoleDto } from 'src/dto/roles/rol.dto';
import { Role } from 'src/entitys/roles.entity';
import { QueuesService } from 'src/queues/queues.service';

@Injectable()
export class UserService {
  /**
   *  
   * @param configServiceEnv 
   * Environment variable services
   * @param userRepository
   * Repository of typeorm of the entity Users 
   * @param rolesServices 
   * Services of Roles 
   */
  constructor(
    private configServiceEnv: ConfigServiceEnv,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesServices: RolesService,
    private readonly myQueueService: QueuesService,
  ) { }
  
  /**
     * Finds all Users and returns the list of Persons if the status is true.
     * @returns Promise
     */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        state: true
      },
      relations: ['role'],
      select: ['id', 'email', 'username', 'state', 'createdAt', 'role']
    });
  }

  /**
   * find user for email
   * @param emailIngresado
   * parameter of type string 
   * @returns Promise
   */
  async findOneByEmail(emailIngresado: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: emailIngresado,
        state: true
      },
      relations: ['role'],
      select: ['id', 'email', 'username', 'state', 'createdAt', 'role']
    });
  }
  /**
   * find user for id
   * @param id 
   * parameter of type number
   * @returns Promise 
   */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
        state: true
      },
      relations: ['role'],
      select: ['id', 'email', 'username', 'state', 'createdAt', 'role']
    });
  }

  /**
   * Function for create a new user
   * @param newUser 
   * Parametre of type CreateUserDto
   * @returns Promise
   */
  async createUser(newUser: CreateUserDto): Promise<User> {
    try {
      const bcryptService: Bcrypt = new Bcrypt();
      newUser.password = await bcryptService.hashPassword(newUser.password);
      const user = this.userRepository.create(newUser);
      const roles: Role[] = await this.rolesServices.getRolById(
        newUser.roles,
      );
      user.role = roles;
      const userCreated: User = await this.userRepository.save(user);
      return userCreated;
    } catch (error) {

      console.log(error);
    }
  }
  /**
   * Delete user for id
   * @param id 
   * Parameter id of type number 
   * @returns Promise
   */
  async delete(id: number): Promise<DeleteResult> {
    const userFound: User = await this.userRepository.findOne({
      where: {
        id: id,
        state: true
      }
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.delete(id);
  }
  /**
   * Update user for id
   * @param id 
   * Parameter id of type number
   * @param user 
   * Parameter user of type UpdateUserDto
   * @returns Promise
   */
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
