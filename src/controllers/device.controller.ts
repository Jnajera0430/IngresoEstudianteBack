import { Controller,Get, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDeviceDto } from 'src/dto/device/device.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { DeviceService } from 'src/services/device.service';

@Controller('device')
@ApiTags('Api-device')
export class DeviceController {
    constructor(
        private readonly deviceService:DeviceService
    ){}

    @Get()
    async getAllDevice(){
        return await this.deviceService.findAllDevice()
    }

    @Get()
    async getDeviceByIdPerson(@Body() person:FindPersonDto){
        return await this.deviceService.findDeviceByPerson(person);
    }

    @Patch()
    async pastchUpdateDevice(@Body() device:UpdateDeviceDto){
        return await this.deviceService.updateDevice(device);
    }

}
