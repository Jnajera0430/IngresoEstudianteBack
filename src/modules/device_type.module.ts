import { Module } from '@nestjs/common';
import { DeviceTypeController } from '../controllers/device_type.controller';
import { DeviceTypeService } from '../services/device_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceType } from 'src/entitys/device_type.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DeviceType])
  ],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
  exports: [DeviceTypeService]
})
export class DeviceTypeModule {}
