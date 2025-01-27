import { Module } from '@nestjs/common';
import { VehicleTypeController } from '../controllers/vehicle_type.controller';
import { VehicleTypeService } from '../services/vehicle_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from 'src/entitys/vehicle_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
  exports:[VehicleTypeService]
})
export class VehicleTypeModule {}
