import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateDeviceTypeDto, DeviceTypeDto } from 'src/dto/device/deviceType.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
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

    @Get()
    async findDeviceType(@Query() pageOptionsDto: PageOptionsDto<DeviceTypeDto>):Promise<ICustomResponse>{
        const { data, meta } = await this.deviceTypeService.findAllDeviceType(pageOptionsDto)
        return customResponse({
            status: HttpStatus.OK,
            message: 'List records.',
            data,
            meta
        });
    }
}
