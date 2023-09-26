import { Controller, Get, Body, Patch, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { UpdateDeviceDto } from 'src/dto/device/device.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
import { DeviceService } from 'src/services/device.service';

@Controller('device')
@ApiTags('Api-device')
export class DeviceController {
    constructor(
        private readonly deviceService: DeviceService,
    ) { }

    @Get()
    async getAllDevice(@Query() pageOptionsDto: PageOptionsDto): Promise<ICustomResponse> {
        const { data, meta } = await this.deviceService.findAllDevice(pageOptionsDto);
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'List device.',
                data,
                meta
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

    @Get()
    async getDeviceByIdPerson(@Body() person: FindPersonDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Device found by person id.',
                data: await this.deviceService.findDeviceByPerson(person)
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

    @Patch()
    async pastchUpdateDevice(@Body() device: UpdateDeviceDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Device has been updated',
                data: await this.deviceService.updateDevice(device)
            });
        } catch (error) {
            debug(error)
            return error;
        }
    }

}
