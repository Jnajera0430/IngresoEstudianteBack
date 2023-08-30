import { Body, Controller, Get, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindPersonDto } from 'src/dto/person/person.dto';
import { UpdateVehicleDto } from 'src/dto/vehicle/vehicle.dto';
import { VehicleService } from 'src/services/vehicle.service';

@Controller('vehicle')
@ApiTags('api-vehicle')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService,
    ){}

    @Get()
    async getAllVehicle(){
        return await this.vehicleService.findAllVehicle();
    }

    @Get()
    async getVehicleByPerson(@Body() person:FindPersonDto){
        return this.getVehicleByPerson(person);
    }

    @Get(':badge')
    async getVehicleByBadge(@Param('badge') badge:string){
        return await this.vehicleService.findVehicleByBadge(badge);
    }

    @Patch()
    async patchUpdateVehicle(@Body() vehicle:UpdateVehicleDto){
        return await this.vehicleService.updateVehicle(vehicle);
    }
}
