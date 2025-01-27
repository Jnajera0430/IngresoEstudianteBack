import { Module } from '@nestjs/common';
import { EntryVehicleService } from '../services/entry_vehicle.service';
import { EntryVehicleController } from '../controllers/entry_vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/entitys/vehicle.entity';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Vehicle,Record_entry])],
  providers: [EntryVehicleService],
  controllers: [EntryVehicleController]
})
export class EntryVehicleModule {}
