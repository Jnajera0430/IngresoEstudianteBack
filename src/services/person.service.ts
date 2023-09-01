import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerson, UpdatePerson } from 'src/dto/person/person.dto';
import { CreatePersonDocTypeDto } from 'src/dto/person/personDocType';
import { CreatePersonTypeDto, PersonTypeEnum } from 'src/dto/person/personType.dto';
import { DoctType } from 'src/entitys/doctType.entity';
import { Person } from 'src/entitys/person.entity';
import { PersonType } from 'src/entitys/person_type.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

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
        const newPerson = this.personRepository.create(person);
        return await this.personRepository.save(newPerson);
    }

    /**
     * Receives a parameter of type CreatePerson
     * @param person
     * Return new Person
     * @returns Promise<Person>
     */
    async createPersonAprendiz(person: CreatePerson): Promise<Person> {
        const newAprendiz = this.personRepository.create(person);
        const [docType, personType] = await Promise.all([
            this.docTypeRepository.findOne({ where: { name: person.docType.name } }),
            this.personTypeRepository.findOne({ where: { name: PersonTypeEnum.APRENDIZ } }),
        ]);
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
    async getPeople(): Promise<Person[]> {
        return await this.personRepository.find({
            where: {
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry", 'doctType']
        });
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
        //console.log({document});       
        return await this.personRepository.findOne({
            where: {
                document
            }
        });
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
