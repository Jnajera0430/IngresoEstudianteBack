import { Controller,Get, Body, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { UpdateDeviceDto } from 'src/dto/device/device.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { ICustomResponse, customResponse } from 'src/services/customResponse.service';
import { DeviceService } from 'src/services/device.service';

@Controller('device')
@ApiTags('Api-device')
export class DeviceController {
    constructor(
        private readonly deviceService:DeviceService,
    ){}

    @Get()
    async getAllDevice():Promise<ICustomResponse>{
        try {
            return customResponse({
                status:HttpStatus.OK,
                message: 'List career',
                data: await this.deviceService.findAllDevice()
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

    @Get()
    async getDeviceByIdPerson(@Body() person:FindPersonDto):Promise<ICustomResponse>{
        try {
            return customResponse({
                status:HttpStatus.OK,
                message: 'List career',
                data: await this.deviceService.findDeviceByPerson(person)
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

    @Patch()
    async pastchUpdateDevice(@Body() device:UpdateDeviceDto):Promise<ICustomResponse>{
        try {
            return customResponse({
                status:HttpStatus.CREATED,
                message: 'List career',
                data: await this.deviceService.updateDevice(device)
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

}
