import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceTypeDto, DeviceTypeDto, UpdateDeviceTypeDto } from 'src/dto/device/deviceType.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { DeviceType } from 'src/entitys/device_type.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceTypeService implements OnModuleInit {

    HttpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    constructor(
        @InjectRepository(DeviceType) private readonly deviceTypeRepository: Repository<DeviceType>,
    ) { }
    /**
     * Function for create a type of device.
     * @param typeDevice CreateDeviceTypeDto
     * @returns DeviceType
     */

    async getRequestStatus(): Promise<HttpStatus> {
        return this.HttpStatus;
    }

    async createDeviceType(typeDevice: CreateDeviceTypeDto) {
        const newTypeDevice = this.deviceTypeRepository.create(typeDevice);
        return await this.deviceTypeRepository.save(newTypeDevice);
    }

    async findAllDeviceType(pageOptionsDto?: PageOptionsDto<DeviceTypeDto>){
        try {
            const [rows, itemCount]= await this.deviceTypeRepository.findAndCount({
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take,
            })
            if (!rows) {
                this.HttpStatus = HttpStatus.NOT_FOUND;
                throw new ValueNotFoundException('Device type not found.');
            }
            const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
            this.HttpStatus = HttpStatus.OK;
            return new PageDto(rows, pageMeta);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Search device type by brand, returns a deviceType.
     * @param brand string
     * @returns DeviceType
     */
    async findDeviceTypeByBrand(brand: string) {
        const deviceFound = await this.deviceTypeRepository.findOne({
            where: {
                brand
            }
        });
        return deviceFound;
    }

    async findDeviceTypeById(id: number) {
        const deviceFound = await this.deviceTypeRepository.findOne({
            where: {
                id
            }
        });
        return deviceFound;
    }

    /**
     *
     * @param deviceType  UpdateDeviceTypeDto
     * @returns Device
     */
    async editDeviceType(deviceType: UpdateDeviceTypeDto) {
        const deviceFound = await this.deviceTypeRepository.findOne({
            where: {
                id: deviceType.id
            }
        });

        if (!deviceFound) {
            throw new ValueNotFoundException(`Device type is not found, ${deviceType.id}`);
        }

        await this.deviceTypeRepository.update(deviceFound.id, deviceType);

        return await this.deviceTypeRepository.findOne({
            where: {
                id: deviceType.id
            }
        });
    }
    /**
     * Creates the type of devices.
     */
    async onModuleInit() {
        const listDeviceType: CreateDeviceTypeDto[] = [
            {
                brand: 'Laptop',
                icon: 'src/assets/icons/device-laptop.svg'
            },
            {
                brand: 'Tablet',
                icon: 'src/assets/icons/device-ipad.svg'
            },
            {
                brand: 'CPU / Componentes',
                icon: 'src/assets/icons/device-cpu.svg'
            }
        ]
        const dataCount: number = await this.deviceTypeRepository.count();

        if (dataCount === 0) {
            for (let deviceType of listDeviceType) {
                this.createDeviceType(deviceType);
            }
        }
    }
}
