import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry.entity';
import { Repository } from 'typeorm';
import { PersonService } from './person.service';
import { RecordsEntryOfPerson } from 'src/dto/recordsEntry/recordEntry.dto';
import { ValueNotFound } from 'src/exceptions/customExcepcion';

@Injectable()
export class RecordEntryService {
    constructor(
        @InjectRepository(Record_entry) private readonly recordEntryRepository: Repository<Record_entry>,
        private readonly personService: PersonService,
    ) { }

    async checkInEntryOfPerson(recordEntry:RecordsEntryOfPerson) { 
        const personFound = await this.personService.getPersonByDocument(recordEntry.person.id);
        if(!personFound){
            throw new ValueNotFound('This person has not been created and is not in our records.');
        }
        if(!recordEntry.checkIn){
            throw new ValueNotFound('This checkin data is not valid, the checkin date is required.');
        }
    }
}
