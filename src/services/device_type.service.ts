import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceTypeDto, DeviceTypeDto } from 'src/dto/device/deviceType.dto';
import { DeviceType } from 'src/entitys/device_type.entity';
import { ValueNotFound } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceTypeService implements OnModuleInit {
    constructor(
        @InjectRepository(DeviceType) private readonly deviceTypeRepository: Repository<DeviceType>,
    ) { }
    /**
     * Function for create a type of device.
     * @param typeDevice CreateDeviceTypeDto
     * @returns DeviceType
     */
    async createDeviceType(typeDevice: CreateDeviceTypeDto) {
        const newTypeDevice = this.deviceTypeRepository.create(typeDevice);
        return await this.deviceTypeRepository.save(newTypeDevice);
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

    async editDeviceType(deviceType: any) {
        const deviceFound = await this.deviceTypeRepository.findOne({
            where: {
                id: deviceType.id
            }
        });

        if (!deviceFound) {
            throw new ValueNotFound(`Device type is not found, ${deviceType.id}`);
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
                brand: 'Portatil'
            },
            {
                brand: 'Tablet'
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
