import { Module } from '@nestjs/common';
import { VehicleTypeController } from '../controllers/vehicle_type.controller';
import { VehicleTypeService } from '../services/vehicle_type.service';

@Module({
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService]
})
export class VehicleTypeModule {}
