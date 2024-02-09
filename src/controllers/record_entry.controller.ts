import { Body, Controller, Get, Post, Param, HttpStatus, Query, Put, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { RoleEnumByType } from 'src/constants/roles.enum';
import { UserAllowed } from 'src/decorators/UserAllowed.decorator';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { FindPersonDocumentDto, FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { FindRecordEntryOfPersonDto, RecordEntryNewDeviceDto, RecordEntryDto, RecordEntryDeviceDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
import { RecordEntryService } from 'src/services/record_entry_and_out.service';

@Controller('records')
@ApiTags('Api-records')
//@UserAllowed() //De esta manera la anotacion permite a cualquier usuario y actua igual sobre todos los metodos.
export class RecordEntryController {
    constructor(
        private readonly recordEntryService: RecordEntryService
    ) { }

    @Post()
    //@UserAllowed(RoleEnumByType.PUESTO_DE_SERVICIO)
    @UserAllowed()
    @HttpCode(201)
    async postRecordPerson(@Body() recordEntry: FindRecordEntryOfPersonDto): Promise<ICustomResponse> {

        const recordFound = await this.recordEntryService.findInRecordEntryByPersonInside(recordEntry.person);

        if (recordFound && !recordFound.checkOut) {
            let data = new FindRecordEntryOfPersonDto(recordFound);
            data = Object.assign(recordFound, data);
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Their process has been successful.',
                data: await this.recordEntryService.recordCheckOutOfPerson(data)
            });
        }
        return customResponse({
            status: HttpStatus.CREATED,
            message: 'The entry has been registered.',
            data: await this.recordEntryService.checkInEntryOfPerson(recordEntry)
        });

    }

    @Post('device')
    @HttpCode(201)
    async postRecordEntryDevice(@Body() recordEntryDevice: RecordEntryNewDeviceDto) {
        return customResponse({
            status: HttpStatus.CREATED,
            message: "Device entry has been registered.",
            data: await this.recordEntryService.registerNewDeviceEntry(recordEntryDevice)
        })

    }

    @Put('device')
    @HttpCode(201)
    async putRecordEntryDevice(@Body() recordEntryDevice:RecordEntryDeviceDto){
        return customResponse({
            status: HttpStatus.CREATED,
            message:"The device entry has been registered.",
            data: await this.recordEntryService.registerDeviceEntry(recordEntryDevice)
        })
    }

    @Post('vehicle')
    @HttpCode(201)
    async postRecordEntryNewVehicle(@Body() recordEntryVehicle:any){
        return customResponse({
            status: HttpStatus.CREATED,
            message: "Vehicle entry has been registered.",
            data: await this.recordEntryService.registerNewVehicle(recordEntryVehicle)
        })
    }

    @Get()
    async getAllRecords(@Query() pageOptionsDto: PageOptionsDto<RecordEntryDto>): Promise<ICustomResponse> {
        //console.log(typeof pageOptionsDto.keyWords);
        const { data, meta } = await this.recordEntryService.findAllRecord(pageOptionsDto)
        //console.log(data);

        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'List records.',
                data,
                meta
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get(':id')
    async getRecordById(@Param('id') id: number): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Record found by id.',
                data: await this.recordEntryService.findRecordById(id)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get('person')
    async getAllRecordByperson(@Body() person: FindPersonDocumentDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Record found by person id.',
                data: await this.recordEntryService.findAllRecordsByPerson(person)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get('person/in')
    async getRecordOfPersonInside(@Body() person: FindPersonDocumentDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'List records of people inside.',
                data: await this.recordEntryService.findInRecordEntryPersonIn(person)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }
}
