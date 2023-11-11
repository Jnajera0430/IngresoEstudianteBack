import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';
import { Between, Repository,Like,ILike } from 'typeorm';
import { PersonService } from './person.service';
import { FindRecordEntryOfPersonDto, RecordEntryDto, RecordsEntryOfPersonDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { EntryTypeService } from './entry_type.service';
import { FindPersonDocumentDto, FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { ParameterDateDto } from 'src/dto/page/parameterDate.dto';
import { Search } from 'src/intefaces/Search.interface';
import { SearchQueries } from 'src/helpers/convertSearch';

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
        if (!recordEntry.person.document) {
            throw new ValueNotFoundException('value invalid')
        }
        const personFound = await this.personService.getPersonByDocument(recordEntry.person.document);
        if (!personFound)
            throw new ValueNotFoundException('This person is not in our records.');

        const entryTypeFound = await this.entryTypeService.findEntryTypeByName(personFound.personTypes.name);
        if (!entryTypeFound)
            throw new ValueNotFoundException('Input record type is not defined.');

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
    async recordCheckOutOfPerson(recordEntry: FindRecordEntryOfPersonDto): Promise<Record_entry> {
        const today = new Date();
        recordEntry.checkOut = today;
        const result = await this.recordEntryRepository.update(recordEntry.id, recordEntry);
        if (result.affected == 0) {
            throw new ValueNotFoundException('The record not found, contact the database manager.');
        }

        return this.recordEntryRepository.create(recordEntry);
    }

    /**
     * 
     * @param recordEntry FindRecordEntryOfPersonDto
     * @returns 
     */
    async findInRecordEntryPersonIn(person: FindPersonDocumentDto): Promise<Record_entry> {
        const today = new Date();
        const personFound = await this.personService.getPersonByDocument(person.document);
        if (!personFound) {
            throw new ValueNotFoundException('This person is not in our records.');
        }
        return await this.recordEntryRepository.findOne({
            where: {
                person: {
                    document: personFound.document
                },
                checkIn: Between(
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0),
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59),
                ),
            },
            relations: ['person', 'vehicleEntry', 'deviceEntry', 'entryType'],
        });
    }


    /**
     * 
     * @param recordEntry FindRecordEntryOfPersonDto
     * @returns 
     */
    async findInRecordEntryByPersonInside(person: FindPersonDocumentDto): Promise<Record_entry> {
        const today = new Date();
        const personFound = await this.personService.getPersonByDocument(person.document);
        if (!personFound) return null;
        return await this.recordEntryRepository.findOne({
            where: {
                person: {
                    document: personFound.document
                },
                checkIn: Between(
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0),
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59),
                ),
            },
            relations: ['person', 'vehicleEntry', 'deviceEntry', 'entryType'],
        });
    }



    /**
     * 
     * @returns 
     */
    async findAllRecord(pageOptionsDto?: PageOptionsDto<RecordEntryDto>): Promise<PageDto<Record_entry>> {
        const search: Search = SearchQueries(pageOptionsDto.keyWords);
        console.log(search);
        
        const [rows, itemCount] = await this.recordEntryRepository.findAndCount({
            skip: pageOptionsDto.skip,
            order: {
                createdAt: pageOptionsDto.order
            },
            take: pageOptionsDto.take,
            where: search,
            relations: ['person', 'vehicleEntry', 'deviceEntry']
        })
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(rows, pageMeta);
    }

    async findRecordById(id: number): Promise<Record_entry> {
        return await this.recordEntryRepository.findOne({
            where: {
                id
            },
            relations: ['person', 'vehicleEntry', 'deviceEntry', 'entryType'],
        });
    }

    async findAllRecordsByPerson(person: FindPersonDocumentDto): Promise<Record_entry[]> {
        return await this.recordEntryRepository.find({
            where: {
                person: {
                    document: person.document
                }
            },
            relations: ['person', 'vehicleEntry', 'deviceEntry', 'entryType'],
        });
    }

    async findRecordsPeopleInside(pageOptionsDto?: PageOptionsDto, parameterDateDto?: ParameterDateDto): Promise<PageDto<Record_entry>> {
        const today = new Date();
        const [entities, itemCount] = await this.recordEntryRepository.findAndCount({
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
            order: { createdAt: pageOptionsDto.order },
            where: {
                //...search,
                checkIn: Between(
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), parameterDateDto.hourFrom, 0, 0),
                    new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), parameterDateDto.hourTo, 59, 59),
                )
            },
            relations: ['person', 'vehicleEntry', 'deviceEntry', 'entryType']
        })
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMeta);
    }

}
