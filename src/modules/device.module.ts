import { Module } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { DeviceController } from '../controllers/device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { DeviceType } from 'src/entitys/device_type.entity';
import { Device } from 'src/entitys/device.entity';
import { PersonModule } from './person.module';
import { DeviceTypeModule } from './device_type.module';
import { RecordEntryModule } from './record_entry_and_out.module';

@Module({
  imports:[TypeOrmModule.forFeature([Person,DeviceType,Device]),DeviceTypeModule,PersonModule],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports:[DeviceService]
})
export class DeviceModule {}
