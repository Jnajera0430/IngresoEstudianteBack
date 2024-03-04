import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/entitys/user.entity';
import { Bcrypt } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { DeleteResult, Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { Role } from 'src/entitys/roles.entity';
import { FileService } from 'src/queues/files/files.service';
import { read } from 'Xlsx'
import { CellObject, DataOfFileExcel, InfoOfProgram, PersonFile } from 'src/dto/person/personFile.dto';
import { QueuesService } from 'src/queues/queues.service';
import { PersonTypeEnumDto } from 'src/dto/person/personDocType';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { DataNotValid } from 'src/exceptions/customExcepcion';
import { validCampusFile, validDataEmpty } from 'src/helpers/validFile';
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
  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const alias = 'user';
    const queryBuilder = this.userRepository.createQueryBuilder(alias)
    queryBuilder
      .select([`${alias}.id`, `${alias}.email`, `${alias}.username`, `${alias}.state`, `role`, `${alias}.createdAt`])
      .leftJoinAndSelect(`${alias}.role`, 'role')
      .orderBy(`${alias}.createdAt`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getMany();
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMeta);
    // return await this.userRepository.find({
    //   where: {
    //     state: true
    //   },
    //   relations: ['role'],
    //   select: ['id', 'email', 'username', 'state', 'createdAt', 'role']
    // });
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

    const cellObject = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
    }
    const sheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];
    //fecha del reporte
    const cellA2: string = workSheet['A2']?.v;
    const cellC2: string = workSheet['C2']?.v;
    //ficha de caracterizacion
    const cellA3: string = workSheet['A3']?.v;
    const cellC3: string = workSheet['C3']?.v;
    //codig de la ficha
    const cellA4: string = workSheet['A4']?.v;
    const cellC4: string = workSheet['C4']?.v;
    //codig de la ficha
    const cellA6: string = workSheet['A6']?.v;
    const cellC6: string = workSheet['C6']?.v;
    //fecha de inicio
    const cellA8: string = workSheet['A8']?.v;
    const cellC8: string = workSheet['C8']?.v;
    //fecha fin
    const cellA9: string = workSheet['A9']?.v;
    const cellC9: string = workSheet['C9']?.v;

    //Valida los datos vacios
    if (!validDataEmpty([cellA2, cellA3, cellA4, cellA6, cellA8, cellA9, cellC2, cellC3, cellC4, cellC6, cellC8, cellC9])) {
      throw new DataNotValid("The data are not valid, please check the file you are uploading if it counts all the data.")
    }
    if (!validCampusFile(workSheet, 13)) {
      throw new DataNotValid("The data are not valid, please check the file you are uploading if it counts all the data.");
    }
    const infoOfProgram: InfoOfProgram = {
      fechaDelReporte: cellC2,
      fichaDeCaracterización: cellC3,
      career: {
        name: cellC6
      },
      codigo: parseInt(cellC4, 10),
      fechaInicio: cellC8,
      fechaFin: cellC9,
    };

    const sizeOfDatos = parseInt(workSheet["!autofilter"].ref.split("I")[1]);
    const listPeopleFile: PersonFile[] = [];
    for (let numRow = 14; numRow <= sizeOfDatos; numRow++) {
      let datoOfPerson: PersonFile;
      for (const cell of Object.values(cellObject)) {
        const dataValue:string = workSheet[cell + numRow]?.v
        switch (cell) {
          case "A":
            if (!validDataEmpty([dataValue])) {
              throw new DataNotValid("There is empty data, please check the file.");
            }
            datoOfPerson = {
              ...datoOfPerson,
              docType: {
                name: dataValue === PersonTypeEnumDto.CC ? 'Cedula' :
                  (dataValue === PersonTypeEnumDto.TI) ? 'Tarjeta de identidad' : 'Otro'
              }
            }
            break;
          case "B":
            if (!validDataEmpty([dataValue])) {
              throw new DataNotValid("There is empty data, please check the file.");
            }
            datoOfPerson = {
              ...datoOfPerson,
              document: parseInt(dataValue)
            }
            break;
          case "C":
            if (!validDataEmpty([dataValue])) {
              throw new DataNotValid("There is empty data, please check the file.");
            }
            datoOfPerson = {
              ...datoOfPerson,
              firtsName: dataValue
            }
            break;
          case "D":
            if (!validDataEmpty([dataValue])) {
              throw new DataNotValid("There is empty data, please check the file.");
            }
            datoOfPerson = {
              ...datoOfPerson,
              lastName: dataValue
            }
            break;
          case "E":
            if (!validDataEmpty([dataValue])) {
              throw new DataNotValid("There is empty data, please check the file.");
            }
            datoOfPerson = {
              ...datoOfPerson,
              state: dataValue === 'EN FORMACION' ? true : false
            }
            break;
        }
      }
      const validPerson = listPeopleFile.some((person: PersonFile) => person?.document === datoOfPerson?.document)
      if (!validPerson) {
        listPeopleFile.push(datoOfPerson);
      }
    }
    const data: DataOfFileExcel = {
      infoOfProgram,
      listPeopleFile
    }
    return this.queueService.addTask(data);
  }

  async readFiles(files: Express.Multer.File[]) {
    const size = files.length;
    const arrayDatosOfReport = []
    for (let file of files) {
      const datosOfReport = this.readFile(file);
      arrayDatosOfReport.push(datosOfReport);
    }
    return arrayDatosOfReport;
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