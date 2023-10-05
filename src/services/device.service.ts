import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto, UpdateDeviceDto } from 'src/dto/device/device.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { Device } from 'src/entitys/device.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';
import { DeviceTypeService } from './device_type.service';
import { PersonService } from './person.service';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageDto } from 'src/dto/page/page.dto';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
        private readonly deviceTypeService: DeviceTypeService,
        private readonly personService: PersonService
    ) { }
    /**
     * 
     * @param device CreateDeviceDto
     * @returns Device
     */
    async createDevice(device: CreateDeviceDto): Promise<Device> {
        const newDevice = this.deviceRepository.create(device);
        const devicetypeFound = await this.deviceTypeService.findDeviceTypeByBrand(device.deviceType.brand);
        if (!devicetypeFound) {
            throw new ValueNotFoundException('Device type not found');
        }
        newDevice.deviceType = devicetypeFound;
        return await this.deviceRepository.save(newDevice);
    }

    /**
     * 
     * @param device CreateDeviceDto
     * @returns Promise<Device>
     */
    async createDeviceForEntry(device: CreateDeviceDto): Promise<Device> {
        const newDevice = this.deviceRepository.create(device);
        const [devicetypeFound, personFound] = await Promise.all([
            this.deviceTypeService.findDeviceTypeByBrand(device.deviceType.brand),
            this.personService.getPersonById(device.person.id)
        ]);
        if (!devicetypeFound) {
            throw new ValueNotFoundException('Device type not found');
        }

        if (!personFound) {
            throw new ValueNotFoundException('Person not found');
        }
        newDevice.deviceType = devicetypeFound;
        newDevice.person = personFound;
        return await this.deviceRepository.save(newDevice);
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
        const alias = "device";
        const queryBuilder = this.deviceRepository.createQueryBuilder(alias);
        queryBuilder
            .leftJoinAndSelect(`${alias}.person`,'person')
            .leftJoinAndSelect(`${alias}.deviceType`,'deviceType')
            .leftJoinAndSelect(`${alias}.recordEntry`,'recordEntry')
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
    async findDeviceByPerson(person: FindPersonDto): Promise<Device> {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                person: {
                    id: person.id
                }
            },
            relations: ['person', 'deviceType','entryDevice']
        });
        if (!deviceFound) {
            throw new ValueNotFoundException(`Device not found by person with this id: , ${person.id}`);
        }
        return deviceFound;
    }

}
