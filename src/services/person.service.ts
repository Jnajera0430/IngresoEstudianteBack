import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerson, PersonDto, UpdatePerson, createPersonAprendizDTO } from 'src/dto/person/person.dto';
import { CreatePersonDocTypeDto } from 'src/dto/person/personDocType';
import { CreatePersonTypeDto, PersonTypeEnum } from 'src/dto/person/personType.dto';
import { DoctType } from 'src/entitys/doctType.entity';
import { Person } from 'src/entitys/person.entity';
import { PersonType } from 'src/entitys/person_type.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';

@Injectable()
export class PersonService implements OnModuleInit {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(DoctType) private readonly docTypeRepository: Repository<DoctType>,
        @InjectRepository(PersonType) private readonly personTypeRepository: Repository<PersonType>,

    ) { }
    /**
     * Receives a parameter of type CreatePerson
     * @param person
     * Return new Person
     * @returns Promise<Person>
     */
    async createPerson(person: CreatePerson): Promise<Person> {
        const { docType, document, firtsName, lastName, personTypes } = person;
        const validDocument = await this.personRepository.findOne({
            where: {
                document,
                doctType: {
                    id: docType
                }

            }
        })
        
        if (validDocument) {
            throw new BadRequestException("Document must be unique.")
        }

        const newPerson = this.personRepository.create({ document, firtsName, lastName, personTypes: { id: personTypes }, doctType: { id: docType } });
        return await this.personRepository.save(newPerson);
    }

    /**
     * Receives a parameter of type CreatePerson
     * @param person
     * Returns new Person
     * @returns Promise<Person>
     */

    async createPersonAprendiz(person: createPersonAprendizDTO): Promise<Person> {
        const newAprendiz = this.personRepository.create(person);
        const docType = await this.docTypeRepository.findOne({ where: { name: person.docType.name } });
        const personType = await this.personTypeRepository.findOne({ where: { name: PersonTypeEnum.APRENDIZ } })
        if (!docType) {
            throw new ValueNotFoundException(`Document type not found: ${person.docType.name}`);
        }

        if (!personType) {
            throw new ValueNotFoundException(`Person type not found: ${PersonTypeEnum.APRENDIZ}`);
        }
        newAprendiz.doctType = docType;
        newAprendiz.personTypes = personType;

        return await this.personRepository.save(newAprendiz);
    }
    /**
     * Finds all Persons and returns the list of Persons if the status is true.
     * @returns Promise
     */
    async getPeople(
        pageOptionsDto?: PageOptionsDto
    ): Promise<PageDto<Person>> {
        const queryBuilder = this.personRepository.createQueryBuilder('person');
        queryBuilder
            .leftJoinAndSelect('person.groups', 'groups')
            .leftJoinAndSelect('person.personTypes', 'personTypes')
            .leftJoinAndSelect('person.device', 'device')
            .leftJoinAndSelect('person.vehicles', 'vehicles')
            .leftJoinAndSelect('person.recorEntry', 'recorEntry')
            .leftJoinAndSelect('person.doctType', 'doctType')
            .orderBy('person.createdAt', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMeta);
    }
    /**
     * Receives a parameter id of type number
     * @param id
     * Finds a Person and returned the matching one
     * @returns Promise<Person>
     */
    async getPersonById(id: number): Promise<Person> {
        return await this.personRepository.findOne({
            where: {
                id,
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry", 'doctType']
        });
    }

    /**
     * Receives a parameter id of type number
     * @param document
     * Finds a Person and returned the matching one
     * @returns Promise<Person>
     */
    async getPersonByDocument(document: number): Promise<Person> | null {
        return await this.personRepository.createQueryBuilder("person")
            .where({ "document": document })
            .leftJoinAndSelect("person.personTypes", "personTypes")
            .leftJoinAndSelect("person.device", "device")
            .leftJoinAndSelect("device.deviceType", "deviceType")
            .leftJoinAndSelect("person.vehicles", "vehicles")
            .leftJoinAndSelect("vehicles.vehicleType", "vehicleType")
            .getOne()
    }

    /**
     * Receives a parameter of type UpdatePerso
     * @param person
     * Returns a person with yours data updates
     * @returns Promise
     */
    async updatePerson(person: UpdatePerson): Promise<Person> {
        const oldPerson: Person = await this.personRepository.findOne({
            where: {
                id: person.id,
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry", 'doctType']
        });
        if (!oldPerson) {
            throw new NotFoundException('Person not found');
        }

        await this.personRepository.update(person.id, person);
        return await this.personRepository.findOne({
            where: {
                id: person.id,
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry", 'doctType']
        });
    }

    //crear un usuario desde un archivo excel
    async createPersonExcel() { }

    async createPersonType(personType: CreatePersonTypeDto) {
        const newPersonType = this.personTypeRepository.create(personType);
        return await this.personTypeRepository.save(newPersonType);
    }

    async getPersonTypeByType(type: string) {
        return await this.personTypeRepository.findOne({
            where: {
                name: type
            }
        })
    }

    async createPersonDocType(docType: CreatePersonDocTypeDto) {
        const newDocType = this.docTypeRepository.create(docType);
        return await this.docTypeRepository.save(newDocType);
    }

    async getAllDocumentType() {
        return await this.docTypeRepository.find()
    }

    async onModuleInit() {
        const docmentTypes: CreatePersonDocTypeDto[] = [
            {
                name: 'Cedula',
            },
            {
                name: 'Tarjeta de identidad'
            }
        ]
        const personTypes: CreatePersonTypeDto[] = [
            {
                name: 'Aprendiz'
            },
            {
                name: 'Docente'
            },
            {
                name: 'Seguridad'
            },
            {
                name: 'Administrativo'
            },
            {
                name: 'Visitante'
            }
        ]

        const countDocType = await this.docTypeRepository.count();
        const countTypePerson = await this.personTypeRepository.count();
        if (countDocType === 0 && countTypePerson === 0) {
            for (let personType of personTypes) {
                await this.createPersonType(personType)
            }
            for (let docType of docmentTypes) {
                await this.createPersonDocType(docType);
            }

            console.log("person types: created");
            console.log("document type: created");

        }

    }
}
