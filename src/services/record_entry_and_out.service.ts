import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';
import { Between, Repository } from 'typeorm';
import { PersonService } from './person.service';
import { FindRecordEntryOfPersonDto, RecordsEntryOfPersonDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { EntryTypeService } from './entry_type.service';

@Injectable()
export class RecordEntryService {
    constructor(
        @InjectRepository(Record_entry) private readonly recordEntryRepository: Repository<Record_entry>,
        private readonly personService: PersonService,
        private readonly entryTypeService: EntryTypeService
    ) { }
    /**
     * 
     * @param recordEntry RecordsEntryOfPersonDto
     * @returns Promise -> Record_Entry
     */
    async checkInEntryOfPerson(recordEntry: RecordsEntryOfPersonDto): Promise<Record_entry> {
        const personFound = await this.personService.getPersonByDocument(recordEntry.person.document);
        if (!personFound) {
            throw new ValueNotFoundException('This person is not in our records.');
        }
        const entryTypeFound = await this.entryTypeService.findEntryTypeByName(personFound.personTypes.name);
        if (!entryTypeFound) {
            throw new ValueNotFoundException('Input record type is not defined.');
        }
        // Se crea un nuevo objeto
        const newRecordEntry = this.recordEntryRepository.create(recordEntry);
        newRecordEntry.person = personFound;
        newRecordEntry.entryType = entryTypeFound;
        newRecordEntry.checkIn = new Date();
        newRecordEntry.checkOut = null;
        return await this.recordEntryRepository.save(newRecordEntry);
    }

    /**
     * 
     * @param recordEntry FindRecordEntryOfPersonDto
     * @returns 
     */
    async recordCheckOutOfPerson(recordEntry: FindRecordEntryOfPersonDto):Promise<Record_entry> {
        const today = new Date();
        recordEntry.checkOut = today;
        const result = await this.recordEntryRepository.update(recordEntry.id, recordEntry);
        if(result.affected == 0){
            throw new ValueNotFoundException('The record not found, contact the database manager.'); 
        }

        return this.recordEntryRepository.create(recordEntry);
    }

    /**
     * 
     * @param recordEntry FindRecordEntryOfPersonDto
     * @returns 
     */
    async findInRecordEntryPersonIn(recordEntry: FindRecordEntryOfPersonDto): Promise<Record_entry> {
        const today = new Date();
        const personFound = await this.personService.getPersonByDocument(recordEntry.person.document);
        if (!personFound) {
            throw new ValueNotFoundException('This person is not in our records.');
        }
        return await this.recordEntryRepository.findOne({
            where: {
                person: {
                    document: personFound.document
                },
                checkIn: Between(
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
                ),
            },
            relations:['person', 'vehicleEntry', 'deviceEntry', 'entryType'],
        });
    }

}
