import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from 'src/dto/device/device.dto';
import { PersonDto } from 'src/dto/person/person.dto';
import { Device } from 'src/entitys/device.entity';
import { ValueNotFound } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device) private readonly deviceRepository: Repository<Device>
    ) { }

    async createDevice(device: CreateDeviceDto): Promise<Device> {
        const newDevice = this.deviceRepository.create(device);
        return await this.deviceRepository.save(newDevice);
    }

    async updateDevice(device: any): Promise<Device> {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                id: device.id
            }
        });
        if (!deviceFound) {
            throw new ValueNotFound(`Device not found, ${device.id}`);
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

    async findDeviceById(id: number) {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                id
            },
            relations:['person', 'deviceType']
        });
        if (!deviceFound) {
            throw new ValueNotFound(`Device not found, ${id}`);
        }

        return deviceFound;
    }

    async findDeviceByPerson(person: PersonDto) {
        const deviceFound = await this.deviceRepository.findOne({
            where: {
                person: {
                    id: person.id
                }
            }
        });
        if (!deviceFound) {
            throw new ValueNotFound(`Device not found by person with this id: , ${person.id}`);
        }

        return deviceFound;
    }

}
