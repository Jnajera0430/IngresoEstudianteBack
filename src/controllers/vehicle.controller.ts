import { Body, Controller, Get, Patch, Param, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { FindPersonDto } from 'src/dto/person/person.dto';
import { UpdateVehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
import { VehicleService } from 'src/services/vehicle.service';

@Controller('vehicle')
@ApiTags('api-vehicle')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService,
    ) { }

    @Get()
    async getAllVehicle(@Query() pageOptionsDto:PageOptionsDto): Promise<ICustomResponse> {
        try {
            const {data,meta} = await this.vehicleService.findAllVehicle(pageOptionsDto);
            return customResponse({
                status: HttpStatus.OK,
                message: 'List vehicle',
                data,
                meta
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get()
    async getVehicleByPerson(@Body() person: FindPersonDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Vehicle found by person.',
                data: await this.getVehicleByPerson(person)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get(':badge')
    async getVehicleByBadge(@Param('badge') badge: string): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Vehicle found by badge.',
                data: await this.vehicleService.findVehicleByBadge(badge)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Patch()
    async patchUpdateVehicle(@Body() vehicle: UpdateVehicleDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Vehicle has been updated.',
                data: await this.vehicleService.updateVehicle(vehicle)
            })
        } catch (error) {
            debug(error);
            return error;
        }
    }
}
