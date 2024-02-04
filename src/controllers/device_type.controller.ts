import { Body, Controller, Post } from '@nestjs/common';
import { CreateDeviceTypeDto } from 'src/dto/device/deviceType.dto';
import { DeviceTypeService } from 'src/services/device_type.service';

@Controller('device-type')
export class DeviceTypeController {

    constructor(
        private readonly deviceTypeService: DeviceTypeService,
    ) { }

    @Post()
    async createDeviceType(
        @Body() deviceType: CreateDeviceTypeDto
    ) {
        return this.deviceTypeService.createDeviceType(deviceType);
    }

}
