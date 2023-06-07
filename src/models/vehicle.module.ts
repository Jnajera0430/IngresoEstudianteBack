import { Module } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { VehicleController } from '../controllers/vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { VehicleType } from 'src/entitys/vehicle_type.entity';
import { EntryVehicle } from 'src/entitys/entry_vehicle.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Person,VehicleType, EntryVehicle])],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule {}
