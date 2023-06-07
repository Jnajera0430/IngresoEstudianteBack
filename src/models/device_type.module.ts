import { Module } from '@nestjs/common';
import { DeviceTypeController } from '../controllers/device_type.controller';
import { DeviceTypeService } from '../services/device_type.service';

@Module({
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService]
})
export class DeviceTypeModule {}
