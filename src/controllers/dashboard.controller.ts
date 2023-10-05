import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParameterDateDto } from "src/dto/page/parameterDate.dto";
import { customResponse } from "src/services/customResponse.service";
import { DashBoardService } from "src/services/dashBoard.service";

@Controller('dashboard')
@ApiTags('api-dashBoard')
export class DashBoardController{
    constructor(
        private readonly dashBoardService:DashBoardService
    ){}

    @Get('statitics')
    async getStatiticsRecords(@Query() parameterDateDto?:ParameterDateDto){
        return customResponse({
            status: HttpStatus.OK,
            message:'Statitics records of people.',
            data: await this.dashBoardService.statisticsRecords(parameterDateDto)
        });
    }
}