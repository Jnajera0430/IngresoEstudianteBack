import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonTypeDto, PersonTypeDto } from 'src/dto/person/personType.dto';
import { PersonType } from 'src/entitys/person_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonTypeService {
    /**
     * Constructor of clase services
     * @param personTypeRepository 
     * PersonType entity typeOrm repository
     */
    constructor(
        @InjectRepository(PersonType) private readonly personTypeRepository: Repository<PersonType>
    ) { }
    
    /**
     * create a new person type
     * @param personType
     * Parameter personType of type CreatePersonDto 
     * @returns Promise
     */
    async createPersonType(personType: CreatePersonTypeDto):Promise<PersonType> {
        const newPersontype = this.personTypeRepository.create(personType);
        return await this.personTypeRepository.save(newPersontype);
    }
    /**
     * Returns a personType list
     * @returns Promise
     */
    async allPersonType() {
        return await this.personTypeRepository.find({
            where:{
                state: true
            },
            relations:['persons']
        });
    }
    /**
     * Searches for a personType by type name
     * @param personType
     * Parameter personType of type PersonTypeDto 
     * @returns Promise
     */
    async getPersonTypeByType(personType: PersonTypeDto):Promise<PersonType> {
        return await this.personTypeRepository.findOne({
            where: {
                name: personType.name,
                state: true
            },
            relations:["persons"]
        });
    }

    /**
     * Searches for a personType by id
     * @param personType 
     * Parameter personType of type PersonTypeDto
     * @returns Promise
     */
    async getPersonTypeById(personType: PersonTypeDto):Promise<PersonType> {
        return await this.personTypeRepository.findOneBy({
            id: personType.id
        });
    }
    /**
     * Update the type of person
     * @param personType
     * Parameter personType of type PersonTypeDto 
     * @returns Promise
     */
    async updatePersonType(personType: PersonTypeDto):Promise<PersonType>{
        await this.personTypeRepository.update(personType.id,personType);
        return await this.personTypeRepository.findOneOrFail({
            where:{
                id: personType.id
            }
        });
    }

}
