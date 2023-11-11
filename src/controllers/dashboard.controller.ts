import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParameterDateDto } from "src/dto/page/parameterDate.dto";
import { ICustomResponse } from "src/intefaces/customResponse.interface";
import { customResponse } from "src/services/customResponse.service";
import { DashBoardService } from "src/services/dashBoard.service";

@Controller('dashboard')
@ApiTags('api-dashBoard')
export class DashBoardController{
    constructor(
        private readonly dashBoardService:DashBoardService
    ){}

    @Get('statitics')
    async getStatiticsRecords(@Query() parameterDateDto?:ParameterDateDto):Promise<ICustomResponse>{
        return customResponse({
            status: HttpStatus.OK,
            message:'Statitics records of people.',
            data: await this.dashBoardService.statisticsRecords(parameterDateDto)
        });
    }
}