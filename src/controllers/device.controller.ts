import {
  Controller,
  Get,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
  Post,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { CreateDeviceDto, UpdateDeviceDto } from 'src/dto/device/device.dto';
import { CreateDeviceTypeDto } from 'src/dto/device/deviceType.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
import { DeviceService } from 'src/services/device.service';
import { DeviceTypeService } from 'src/services/device_type.service';

@Controller('device')
@ApiTags('Api-device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly deviceTypeService: DeviceTypeService,
  ) {}

  @Get()
  async getAllDevice(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<ICustomResponse> {
    const { data, meta } = await this.deviceService.findAllDevice(
      pageOptionsDto,
    );
    try {
      return customResponse({
        status: HttpStatus.OK,
        message: 'List device.',
        data,
        meta,
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Get('person/:id')
  async getDeviceByIdPerson(
    @Param('id') personID: number,
  ): Promise<ICustomResponse> {
    try {
      console.log('personID', personID);
      return customResponse({
        status: HttpStatus.OK,
        message: 'Device found by person id.',
        data: await this.deviceService.findDeviceByPersonId(personID),
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Patch()
  async pastchUpdateDevice(
    @Body() device: UpdateDeviceDto,
  ): Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.CREATED,
        message: 'Device has been updated',
        data: await this.deviceService.updateDevice(device),
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDevice(
    @Body()
    device: {
      person: number;
      deviceType: number;
      recordEntryId: number;
    },
  ): Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.CREATED,
        message: 'Device has been created',
        data: await this.deviceService.createDevice(device),
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Get('types')
  async getAllDeviceType(
    @Query() pageOptionsDto: PageOptionsDto,

  ): Promise<ICustomResponse> {
    try {
      const devices = await this.deviceTypeService.findAllDeviceType(
        pageOptionsDto,
      );
      return customResponse({
        status: await this.deviceTypeService.getRequestStatus(),
        message: 'List device type.',
        data: devices.data,
        meta: devices.meta,
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }

  @Post('type')
  @HttpCode(HttpStatus.CREATED)
  async createDeviceType(
    @Body() device: CreateDeviceTypeDto,
  ): Promise<ICustomResponse> {
    try {
      return customResponse({
        status: HttpStatus.CREATED,
        message: 'Device type has been created',
        data: await this.deviceTypeService.createDeviceType(device),
      });
    } catch (error) {
      debug(error);
      return error;
    }
  }
}
