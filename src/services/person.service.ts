import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerson, UpdatePerson } from 'src/dto/person/person.dto';
import { Person } from 'src/entitys/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) { }
    /**
     * Receives a parameter of type CreatePerson
     * @param person 
     * Return new Person    
     * @returns Promise<Person>
     */
    async createPerson(person: CreatePerson):Promise<Person> {
        const newPerson = this.personRepository.create(person);
        return await this.personRepository.save(newPerson);
    }
    /**
     * Finds all Persons and returns the list of Persons if the status is true.
     * @returns Promise
     */
    async getAllPerson():Promise<Person[]> {
        return await this.personRepository.find({
            where: {
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry"]
        });
    }
    /**
     * Receives a parameter id of type number
     * @param id 
     * Finds a Person and returned the matching one 
     * @returns Promise<Person>
     */
    async getPersonById(id: number):Promise<Person> {
        return await this.personRepository.findOne({
            where: {
                id,
                state: true
            },
            relations: ["groups", "personTypes", "device", "vehicles", "recorEntry"]
        });
    }

    /**
     * Receives a parameter of type UpdatePerso
     * @param person 
     * Returns a person with yours data updates
     * @returns Promise
     */
    async updatePerson(person: UpdatePerson):Promise<Person> {
        await this.personRepository.update(person.id, person);
        return await this.personRepository.findOne({
            where:{
                id:person.id,
                state: true
            },
            relations:["groups", "personTypes", "device", "vehicles", "recorEntry"]
        });
    }

    //crear un usuario desde un archivo excel
    async createPersonExcel(){}
}
