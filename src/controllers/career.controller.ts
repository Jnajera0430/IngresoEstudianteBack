import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {CareerService} from '../services/career.service'
import { CreateCareerDto, UpdateOrFindCareer } from 'src/dto/career/career.dto';

@Controller('career')
export class CareerController {
    constructor(private readonly careerService: CareerService){}

    @Get()
    async getListCareer(){
        return await this.careerService.listCareer();
    }

    @Post()
    async postCreateCareer(@Body() newCareer:CreateCareerDto){
        return await this.careerService.createCareer(newCareer);
    }

    @Get(":id")
    async getCareerById(@Param('id') id:number){
        return await this.careerService.findById(id);
    }

    @Patch()
    async patchUpdateCareer(@Body() career: UpdateOrFindCareer){
        return await this.careerService.updateCareer(career);
    }
}
