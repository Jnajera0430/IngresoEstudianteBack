import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonTypeDto, PersonTypeDto } from 'src/dto/person/personType.dto';
import { PersonType } from 'src/entitys/person_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonTypeService {
    constructor(
        @InjectRepository(PersonType) private readonly personTypeRepository: Repository<PersonType>
    ) { }

    async createPersonType(personType: CreatePersonTypeDto) {
        const newPersontype = this.personTypeRepository.create(personType);
        return await this.personTypeRepository.save(newPersontype);
    }

    async allPersonType() {
        return await this.personTypeRepository.find({
            where:{
                state: true
            }
        });
    }

    async getPersonTypeByType(personType: PersonTypeDto) {
        return await this.personTypeRepository.findOne({
            where: {
                name: personType.name,
                state: true
            }
        });
    }

    async getPersonTypeById(personType: PersonTypeDto) {
        return await this.personTypeRepository.findOneBy({
            id: personType.id
        });
    }

    async updatePersonType(personType: PersonTypeDto){
        await this.personTypeRepository.update(personType.id,personType);
        return await this.personTypeRepository.findOneOrFail({
            where:{
                id: personType.id
            }
        });
    }

}
