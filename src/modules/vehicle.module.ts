import { Module } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { VehicleController } from '../controllers/vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { VehicleType } from 'src/entitys/vehicle_type.entity';
import { RecordVehicle } from 'src/entitys/entry_vehicle.entity';
import { Vehicle } from 'src/entitys/vehicle.entity';
import { VehicleTypeModule } from './vehicle_type.module';
import { PersonModule } from './person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person, VehicleType, RecordVehicle, Vehicle]),VehicleTypeModule,PersonModule],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService]
})
export class VehicleModule { }
