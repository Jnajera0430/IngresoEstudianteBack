import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto, CreateVehicleToEntryDto, FindVehicleToRecords, UpdateVehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { Vehicle } from 'src/entitys/vehicle.entity';
import { ValueNotFoundException } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';
import { VehicleTypeService } from './vehicle_type.service';
import { PersonService } from './person.service';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { FindPersonDto } from 'src/dto/person/person.dto';

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
			this.personService.getPersonById(vehicle.person)
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

	async createVehicleToRecord(vehicle:CreateVehicleToEntryDto){
		const vehicleTypeFound = await this.vehicleTypeService.findVehicleTypeById(vehicle.idVehicleType)
		if(!vehicleTypeFound)
			throw new ValueNotFoundException("Vehicle type not found.");
		const newVehicle = this.vehicleRepository.create({
			badge: vehicle.badge,
			vehicleType: vehicleTypeFound,
			person: vehicle.idPerson
		});
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
			relations: ['person', 'idRecordVehicle', 'vehicleType']
		});
	}

	async findAllVehicle(pageOptionsDto: PageOptionsDto):Promise<PageDto<Vehicle>> {
		const alias = 'vehicle';
		const queryBuilder =this.vehicleRepository.createQueryBuilder(alias);
		queryBuilder
			.leftJoinAndSelect(`${alias}.person`,'person')
			.leftJoinAndSelect(`${alias}.vehicleType`,'vehicleType')
			.leftJoinAndSelect(`${alias}.idRecordVehicle`,'idRecordVehicle')
			.orderBy(`${alias}.createdAt`,pageOptionsDto.order)
			.skip(pageOptionsDto.skip)
			.take(pageOptionsDto.take)
		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();
		const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
		return new PageDto(entities,pageMeta)
		// return await this.vehicleRepository.find({
		// 	relations: ['person', 'vehicleType', 'entryVehicle']
		// });
	}

	async findAllVehicleByPersonID(person: FindPersonDto){
		const vehiclesFound = await this.vehicleRepository.find({
			where: {
				person: person.id
			}
		});
		if(!vehiclesFound){
			throw new ValueNotFoundException(`Vehicles not found`);
		}

		return vehiclesFound;
	}

	async findVehicleByID(findVehicleToRecords:FindVehicleToRecords){
		return await this.vehicleRepository.findOne({
			where: {
				id: findVehicleToRecords.idVehicle,
				person: findVehicleToRecords.idPerson
			}
		});
	}
}
