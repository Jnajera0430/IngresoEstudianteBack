import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto, CreateDeviceForEntry, DeviceDto, UpdateDeviceDto } from 'src/dto/device/device.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { Device } from 'src/entitys/device.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';
import { DeviceTypeService } from './device_type.service';
import { PersonService } from './person.service';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { DeviceType } from 'src/entitys/device_type.entity';
import { Person } from 'src/entitys/person.entity';
import { RecordEntryService } from './record_entry_and_out.service';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
        private readonly deviceTypeService: DeviceTypeService,
        private readonly personService: PersonService,
    ) { }
    /**
     *
     * @param device CreateDeviceDto
     * @returns Device
     */
    async createDevice(device: any): Promise<Device> {
        const person: Person = await this.personService.getPersonById(device.person);
        const deviceType: DeviceType = await this.deviceTypeService.findDeviceTypeById(device.deviceType);
        //const entry: any = await this.recordEntryService.findRecordEntryById(device.recordEntryId);

        console.log(person);
        console.log(deviceType);

        const newDevice = this.deviceRepository.create({
            person: person.id,
            deviceType: deviceType,
            //dateOfEntry: new Date(),
           // recordEntry: entry
        });

        console.log('===>',newDevice);
        // const devicetypeFound = await this.deviceTypeService.findDeviceTypeByBrand(device.deviceType.brand);
        // if (!devicetypeFound) {
        //     throw new ValueNotFoundException('Device type not found');
        // }
        // newDevice.deviceType = devicetypeFound;
        return await this.deviceRepository.save(newDevice);
    }

    /**
     *
     * @param device CreateDeviceDto
     * @returns Promise<Device>
     */
    async createDeviceForEntry(device: CreateDeviceForEntry): Promise<Device> {
        const newDevice = this.deviceRepository.create(device);
        const devicetypeFound = await this.deviceTypeService.findDeviceTypeById(device.idDeviceType);

        if (!devicetypeFound) {
            throw new ValueNotFoundException('Device type not found');
        }

        newDevice.deviceType = devicetypeFound;
        newDevice.person = device.person;
        // newDevice.dateOfEntry = new Date()
        return await this.deviceRepository.save(newDevice);
    }

    /**
     * @param id
     * @param idPerson
     * @returns
     */
    async registerInAndOut(id:number,idPerson: number){
        const deviceFound = await this.deviceRepository.findOne({where:{id,person:idPerson}})
        if(!deviceFound){
            throw new NotFoundException("Device Not Found")
        }
        // if(!deviceFound.dateOfOut){
        //     deviceFound.dateOfOut = new Date()
        //     return await this.deviceRepository.save(deviceFound)
        // }
        // deviceFound.dateOfEntry= new Date();
        // deviceFound.dateOfOut = null;
        return await this.deviceRepository.save(deviceFound);
    }

    /**
     *
     * @param device UpdateDeviceDto
     * @returns Device
     */
    async updateDevice(device: UpdateDeviceDto): Promise<Device> {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                id: device.id
            }
        });
        if (!deviceFound) {
            throw new ValueNotFoundException(`Device not found, ${device.id}`);
        }
        const [_, deviceFoundUpdated] = await Promise.all([
            this.deviceRepository.update(deviceFound.id, device),
            this.deviceRepository.findOne({
                where: {
                    id: deviceFound.id
                }
            })
        ])
        return deviceFoundUpdated
    }

    async findAllDevice(pageOptionsDto?: PageOptionsDto){

        const [] = await this.deviceRepository.findAndCount();
        const alias = "device";
        const queryBuilder = this.deviceRepository.createQueryBuilder(alias);
        queryBuilder
            .leftJoinAndSelect(`${alias}.person`,'person')
            .leftJoinAndSelect(`${alias}.deviceType`,'deviceType')
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        const pageMeta = new PageMetaDto({pageOptionsDto,itemCount});
        return new PageDto(entities, pageMeta);
        // return this.deviceRepository.find({
        //     relations: ['person', 'deviceType','entryDevice']
        // });
    }

    /**
     *
     * @param id number
     * @returns Device
     */
    async findDeviceById(id: number): Promise<Device> {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                id
            },
            relations: ['person', 'deviceType','entryDevice']
        });
        if (!deviceFound) {
            throw new ValueNotFoundException(`Device not found, ${id}`);
        }

        return deviceFound;
    }

    /**
     *
     * @param person PersonDto
     * @returns
     */
    async findDeviceByPerson(person: FindPersonDto): Promise<Device[]> {
        const deviceFound = await this.deviceRepository.find({
            where: {
                person: person.id
            },
            relations: ['deviceType']
        });
        if (!deviceFound) {
            throw new ValueNotFoundException(`Device not found by person with this id: , ${person.id}`);
        }
        return deviceFound;
    }

    // find device by person id
    async findDeviceByPersonId(id: number) {
        const deviceFound = await this.deviceRepository.createQueryBuilder('devices')
            .leftJoinAndSelect('devices.person', 'person')
            .leftJoinAndSelect('devices.deviceType', 'deviceType')
            .where(`person.id = ${id}`)
            .getMany();
        if (!deviceFound) {
            throw new ValueNotFoundException(`Device not found by person with this id: , ${id}`);
        }
        return deviceFound;
    }

    async findDeviceBySerialID(serial: string) {
        const deviceFound = await this.deviceRepository.createQueryBuilder('devices')
            .where(`devices.serialId = '${serial}'`)
            .getOne();
        return deviceFound;
    }

}
