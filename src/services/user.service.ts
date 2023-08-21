import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceEnv } from 'src/config/config.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { DeleteResult, Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { Role } from 'src/entitys/roles.entity';
import { FileService } from 'src/queues/files/files.service';
import { Job } from 'bull';
import { read } from 'Xlsx'
import { CellObject, PersonFile } from 'src/dto/person/personFile.dto';
import { Express } from 'express';
import { QueuesService } from 'src/queues/queues.service';
@Injectable()
export class UserService implements OnModuleInit {
  /**
   * constructor
   * @param userRepository
   * Repository of typeorm of the entity Users
   * @param rolesServices
   * Services of Roles
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesServices: RolesService,
    private readonly fileManaggerQueue: FileService,
    private readonly queueService: QueuesService,
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
      select: ['id', 'email', 'username', 'state', 'createdAt', 'role', 'password']
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


  async readFile(file: Express.Multer.File) {
    const workBook = read(file.buffer, {
      type: 'buffer',
      raw: true,
      cellDates: true
    })
    const sheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];
    //fecha del reporte
    const cellA2 = workSheet['A2'].v;
    const cellC2 = workSheet['C2'].v;
    //ficha de caracterizacion
    const cellA3 = workSheet['A3'].v;
    const cellC3 = workSheet['C3'].v;
    //codig de la ficha
    const cellA4 = workSheet['A4'].v;
    const cellC4 = workSheet['C4'].v;
    //codig de la ficha
    const cellA6 = workSheet['A6'].v;
    const cellC6 = workSheet['C6'].v;
    //fecha de inicio
    const cellA8 = workSheet['A8'].v;
    const cellC8 = workSheet['C8'].v;
    //fecha fin
    const cellA9 = workSheet['A9'].v;
    const cellC9 = workSheet['C9'].v;

    const infoOfProgram = {
      [cellA2]: cellC2,
      [cellA3]: cellC3,
      [cellA4]: parseInt(cellC4, 10),
      [cellA8]: cellC8,
      [cellA9]: cellC9,
    };
    const cellObject = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
    }

    const sizeOfDatos = parseInt(workSheet["!autofilter"].ref.split("I")[1]);
    const listPersonFile: PersonFile[] = [];
    for (let numRow = 14; numRow <= sizeOfDatos; numRow++) {
      let datoOfPerson: PersonFile = {};
      for (const cell of Object.values(cellObject)) {
        switch (cell) {
          case "A":
            datoOfPerson = {
              ...datoOfPerson,
              docType: workSheet[cell + numRow].v
            }
            break;
          case "B":
            datoOfPerson = {
              ...datoOfPerson,
              document: workSheet[cell + numRow].v
            }
            break;
          case "C":
            datoOfPerson = {
              ...datoOfPerson,
              firtsName: workSheet[cell + numRow].v
            }
            break;
          case "D":
            datoOfPerson = {
              ...datoOfPerson,
              lastName: workSheet[cell + numRow].v
            }
            break;
          case "E":
            datoOfPerson = {
              ...datoOfPerson,
              state: workSheet[cell + numRow].v === 'EN FORMACION' ? true : false
            }
            break;
        }
      }
      const validPerson = listPersonFile.some((person: PersonFile) => person?.document === datoOfPerson?.document)
      if (!validPerson) {
        listPersonFile.push(datoOfPerson);
      }
    }
    const data = {
      infoOfProgram,
      listPersonFile
    }
    return this.queueService.addTask(data);
  }
  async readFiles(files: Express.Multer.File[]) {
    const size = files.length;
    for(let file of files){
      this.readFile(file);
    }
  }

  async onModuleInit() {
    const usersDefault: CreateUserDto[] = [
      {
        email: "superusuario@superuser.com",
        username: "Superusuario",
        password: "superUser123",
        roles: [1]
      },
      {
        email: "administrador@administrador.com",
        username: "Administrador",
        password: "administrador123",
        roles: [2]
      },
      {
        email: "auditor@Auditor.com",
        username: "Auditor",
        password: "auditor123",
        roles: [3]
      },
      {
        email: "Puestodeservicio@servicio.com",
        username: "Punto de servicio",
        password: "servicio123",
        roles: [4]
      },

    ]
    const usersCount = await this.userRepository.count();
    if (usersCount === 0) {
      for (let user of usersDefault) {
        this.createUser(user);
      }
      console.log('Users: created');

    }
  }


}