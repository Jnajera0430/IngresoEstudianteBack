import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { Vehicle } from 'src/entitys/vehicle.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';
import { VehicleTypeService } from './vehicle_type.service';
import { PersonService } from './person.service';

@Injectable()
export class VehicleService {
	constructor(
		@InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
		private readonly vehicleTypeService: VehicleTypeService,
		private readonly personService: PersonService
	) { }

	async createVehicle(vehicle: CreateVehicleDto): Promise<Vehicle> {
		const newVehicle = this.vehicleRepository.create(vehicle);
		const vehicleTypeFound = await this.vehicleTypeService.findVehicleTypeByVendor(vehicle.vehicleType.vendor);
		if(!vehicleTypeFound){
			throw new ValueNotFoundException('Vehicle type not found')
		}
		newVehicle.vehicleType = vehicleTypeFound;
		return await this.vehicleRepository.save(newVehicle);
	}

	async createVehicleEntry(vehicle: CreateVehicleDto): Promise<Vehicle> {
		const newVehicle = this.vehicleRepository.create(vehicle);
		const [vehicleTypeFound,personFound] = await Promise.all([
			this.vehicleTypeService.findVehicleTypeByVendor(vehicle.vehicleType.vendor),
			this.personService.getPersonById(vehicle.person.id)
		])
		if(!vehicleTypeFound){
			throw new ValueNotFoundException('Vehicle type not found')
		}
		if(!personFound){
			throw new ValueNotFoundException('Person not found')
		}
		newVehicle.vehicleType = vehicleTypeFound;
		return await this.vehicleRepository.save(newVehicle);
	}

	async updateVehicle(vehicle: UpdateVehicleDto): Promise<Vehicle> {
		const vehiclefound = await this.vehicleRepository.findOne({
			where: {
				id: vehicle.id
			}
		});

		if (!vehiclefound) {
			throw new ValueNotFoundException(`Vehicle not found ${vehicle.id}`);
		}

		const [_, vehicleUpdated] = await Promise.all([
			this.vehicleRepository.update(vehiclefound.id, vehicle),
			this.vehicleRepository.findOne({
				where: {
					id: vehicle.id
				}
			})
		]);

		return vehicleUpdated;
	}

	async findVehicleByBadge(badge: string):Promise<Vehicle> {
		return await this.vehicleRepository.findOne({
			where: {
				badge: badge
			},
			relations: ['person', 'vehicleType', 'entryVehicle']
		});
	}

	async findAllVehicle():Promise<Vehicle[]> {
		return await this.vehicleRepository.find({
			relations: ['person', 'vehicleType', 'entryVehicle']
		});
	}
}
