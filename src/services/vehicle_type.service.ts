import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleTypeDto, UpdateVehicleType } from 'src/dto/vehicle/vehicleType.dto';
import { VehicleType } from 'src/entitys/vehicle_type.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTypeService implements OnModuleInit{
    constructor(
        @InjectRepository(VehicleType) private readonly vehicleTypeRepository: Repository<VehicleType>
    ) { }

    async createVehicleType(vehicleType: CreateVehicleTypeDto) {
        const newVehicleType = this.vehicleTypeRepository.create(vehicleType);
        return await this.vehicleTypeRepository.save(newVehicleType);
    }

    async updateVehicleType(vehicleType: UpdateVehicleType) {
        const vehicleTypeFound = await this.vehicleTypeRepository.findOne({
            where: {
                id: vehicleType.id
            }
        });
        if (!vehicleTypeFound) {
            throw new ValueNotFoundException(`Vehicle type not found ${vehicleType.id}`);
        }

        const [_, vehicleTypeUpdated] = await Promise.all([
            this.vehicleTypeRepository.update(vehicleTypeFound.id, vehicleType),
            this.vehicleTypeRepository.findOne({
                where: {
                    id: vehicleType.id
                }
            })
        ]);

        return vehicleTypeUpdated;
    }

    async findVehicleTypeByVendor(vendor: string) {
        return this.vehicleTypeRepository.findOne({
            where: {
                vendor
            }
        });
    }

    async findVehicleTypeById(id: number) {
        return this.vehicleTypeRepository.findOne({
            where: {
                id
            }
        });
    }

    async onModuleInit() {
        const vehicleTypes:CreateVehicleTypeDto[] = [
            {
                vendor:'Automóvil',
                icon:'src/assets/icons/vehicle-car'
            },
            {
                vendor:'Motocicleta',
                icon:'src/assets/icons/vehicle-motorcycle'
            }
        ]

        const numVehicleType: number = await this.vehicleTypeRepository.count();
        if(numVehicleType === 0){
            for(let vehicleType of vehicleTypes){
                this.createVehicleType(vehicleType);
            }

            console.log('Vehicle type created');
        }
    }
}
