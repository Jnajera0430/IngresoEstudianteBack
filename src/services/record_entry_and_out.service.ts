import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';
import { Between, Repository, Like, ILike } from 'typeorm';
import { PersonService } from './person.service';
import { FindRecordEntryOfPersonDto, RecordEntryNewDeviceDto, RecordEntryDto, RecordsEntryOfPersonDto, RecordEntryDeviceDto, RecordNewVehicleDto, RecordVehicleDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { EntryTypeService } from './entry_type.service';
import { FindPersonDocumentDto } from 'src/dto/person/person.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { ParameterDateDto } from 'src/dto/page/parameterDate.dto';
import { Search } from 'src/intefaces/Search.interface';
import { SearchQueries } from 'src/helpers/convertSearch';
import { DeviceService } from './device.service';
import { VehicleService } from './vehicle.service';
import { RecordDevice } from 'src/entitys/entry_device.entity';
import { RecordVehicle } from 'src/entitys/entry_vehicle.entity';

@Injectable()
export class RecordEntryService {
    constructor(
        @InjectRepository(Record_entry) private readonly recordEntryRepository: Repository<Record_entry>,
        @InjectRepository(RecordDevice) private readonly recordDeviceRepository: Repository<RecordDevice>,
        @InjectRepository(RecordVehicle) private readonly recordVehicleRepository: Repository<RecordVehicle>,
        private readonly personService: PersonService,
        private readonly entryTypeService: EntryTypeService,
        private readonly deviceService: DeviceService,
        private readonly vehicleService: VehicleService
    ) { }
    /**
     *
     * @param recordEntry RecordsEntryOfPersonDto
     * @returns Promise -> Record_Entry
     */
    async checkInEntryOfPerson(recordEntry: RecordsEntryOfPersonDto): Promise<any> {
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
        const entry = await this.recordEntryRepository.save(newRecordEntry)
        // const devices = await this.
        return entry;
    }

    /**
     *
     * @param recordEntry FindRecordEntryOfPersonDto
     * @returns
     */
    async recordCheckOutOfPerson(recordEntry: Record_entry): Promise<Record_entry> {
        const today = new Date();
        recordEntry.checkOut = today;
        return this.recordEntryRepository.save(recordEntry);
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
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
                ),
            },
            relations: ['person', 'idRecordVehicle', 'deviceEntry', 'entryType'],
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
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
                ),
            },
            order: {
                createdAt: 'DESC'
            },
            relations: ['person', 'idRecordVehicle', 'idRecordDevice', 'entryType'],
        });
    }

    /**
     *
     * @returns
     */
    async findAllRecord(pageOptionsDto?: PageOptionsDto<RecordEntryDto>): Promise<PageDto<Record_entry>> {
        //const search: Search = SearchQueries(pageOptionsDto.keyWords);
        //console.log(search);

        const rows = await this.recordEntryRepository.createQueryBuilder("record")
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .orderBy("record.createdAt", pageOptionsDto.order)
            .leftJoinAndSelect("record.person", "person")
            .leftJoinAndSelect("person.device", "devices")
            .leftJoinAndSelect("devices.deviceType", "deviceType")
            .getMany()

        const itemCount = rows.length
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(rows, pageMeta);
    }

    async findRecordById(id: number): Promise<Record_entry> {
        return await this.recordEntryRepository.findOne({
            where: {
                id
            },
            relations: ['person', 'idRecordVehicle', 'idRecordDevice', 'entryType'],
        });
    }

    async findAllRecordsByPerson(person: FindPersonDocumentDto): Promise<Record_entry[]> {
        return await this.recordEntryRepository.find({
            where: {
                person: {
                    document: person.document
                }
            },
            relations: ['person', 'idRecordVehicle', 'deviceEntry', 'entryType'],
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
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), parameterDateDto.hourFrom, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), parameterDateDto.hourTo, 59, 59),
                )
            },
            relations: ['person', 'idRecordVehicle', 'idRecordDevice', 'entryType']
        })
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMeta);
    }

    async findRecordEntryById(id: number): Promise<Record_entry> {
        return await this.recordEntryRepository.findOne({
            where: {
                id
            },
            relations: ['person', 'idRecordVehicle', 'idRecordDevice', 'entryType']
        });
    }

    async registerNewDeviceEntry(recordEntryDevice: RecordEntryNewDeviceDto): Promise<RecordDevice> {
        const entryFound = await this.findRecordById(recordEntryDevice.idRecord)
        if (!entryFound)
            throw new ValueNotFoundException("The user has not registered an entry.")
        const newDevice = await this.deviceService.createDeviceForEntry({ person: entryFound.person.id, idDeviceType: recordEntryDevice.idDeviceType })
        if (!newDevice)
            throw new ValueNotFoundException("Failed to create device.")

        const newRecordDevice = this.recordDeviceRepository.create({
            idRecord: entryFound.id,
            idDevice: newDevice.id,
            dateEntry: new Date(),
            dateExit: null,
            inside: true,
            out: false
        })
        return await this.recordDeviceRepository.save(newRecordDevice)
    }

    async registerDeviceEntry(recordEntryDevice: RecordEntryDeviceDto) {
        const today = new Date();
        const entryFound = await this.findRecordById(recordEntryDevice.idRecord)
        if (!entryFound) {
            throw new ValueNotFoundException("The user has not registered an entry.")
        }
        const deviceFound = await this.deviceService.registerInAndOut(recordEntryDevice.idDevice, entryFound.person.id);
        if (!deviceFound) {
            throw new ValueNotFoundException("Device not found.")
        }

        const recordDeviceFound = await this.recordDeviceRepository.findOne({
            where: {
                idDevice: deviceFound.id,
                idRecord: entryFound.id,
                dateEntry: Between(
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
                ),
            },
            order: {
                createdAt: "DESC"
            }
        })
         
        if (recordDeviceFound && !recordDeviceFound.out) {
            recordDeviceFound.dateExit = new Date();
            recordDeviceFound.out = true;
            return { message: "The device's departure has been recorded.", data: await this.recordDeviceRepository.save(recordDeviceFound) };
        }

        const newRecordDevice = this.recordDeviceRepository.create({
            idDevice: deviceFound.id,
            idRecord: entryFound.id,
            dateEntry: new Date(),
            dateExit: null,
            inside: true,
            out: false,
        });
        return { message: "Device entry has been registred.", data: await this.recordDeviceRepository.save(newRecordDevice) };
    }

    async registerNewVehicle(recordEntryVehicle: RecordNewVehicleDto) {
        const entryFound = await this.findRecordById(recordEntryVehicle.idRecord)

        if (!entryFound) {
            throw new ValueNotFoundException("The user has not registered an entry.")
        }

        const newVehicle = await this.vehicleService.createVehicleToRecord({
            badge: recordEntryVehicle.badge,
            idPerson: entryFound.person.id,
            idVehicleType: recordEntryVehicle.idVehicleType,
        });

        if (!newVehicle)
            throw new ValueNotFoundException("Failed to create device.");

        const newRecordVehicle = this.recordVehicleRepository.create({
            dateEntry: new Date(),
            dateExit: null,
            idRecord: entryFound.id,
            idVehicle: newVehicle.id,
            inside: true,
            out: false
        })

        return await this.recordVehicleRepository.save(newRecordVehicle);
    }

    async registerVehicle(recordVehicle: RecordVehicleDto) {
        const today = new Date()
        const entryFound = await this.findRecordById(recordVehicle.idRecord);

        if (!entryFound) {
            throw new ValueNotFoundException("The user has not registered an entry.");
        }
        const vehicleFound = await this.vehicleService.findVehicleByID({ idPerson: entryFound.person.id, idVehicle: recordVehicle.idVehicle });
        if (!vehicleFound) {
            throw new ValueNotFoundException("Vehicle not found.");
        }
        const recordVehicleFound = await this.recordVehicleRepository.findOne({
            where: {
                idVehicle: vehicleFound.id,
                idRecord: entryFound.id,
                dateEntry: Between(
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
                    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
                )
            },
            order: {
                createdAt: "DESC"
            }
        })

        if (recordVehicleFound && recordVehicleFound.inside && !recordVehicleFound.out) {
            recordVehicleFound.dateExit = new Date();
            recordVehicleFound.out = true;

            return { message: "The vehicle's departure has been recorded.", data: await this.recordVehicleRepository.save(recordVehicleFound) };
        }

        const newRecordVehicle = this.recordVehicleRepository.create({
            idRecord: recordVehicle.idRecord,
            idVehicle: recordVehicle.idVehicle,
            dateEntry: new Date(),
            dateExit: null,
            inside: true,
            out: false
        });

        return { message: "Vehicle entry has been registred.", data: await this.recordVehicleRepository.save(newRecordVehicle) };
    }
}
