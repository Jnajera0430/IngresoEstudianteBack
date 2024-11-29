import { Body, Controller, Get, Post, Param, HttpStatus, Query, Put, HttpCode, HttpException, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { RoleEnumByType } from 'src/constants/roles.enum';
import { UserAllowed } from 'src/decorators/UserAllowed.decorator';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { FindPersonDocumentDto, FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { FindRecordEntryOfPersonDto, RecordEntryNewDeviceDto, RecordEntryDto, RecordEntryDeviceDto, RecordNewVehicleDto, RecordVehicleDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { RecordDevice } from 'src/entitys/entry_device.entity';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { customResponse } from 'src/services/customResponse.service';
import { RecordEntryService } from 'src/services/record_entry_and_out.service';

@UserAllowed(RoleEnumByType.PUESTO_DE_SERVICIO, RoleEnumByType.ADMINISTRADOR, RoleEnumByType.AUDITOR)
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
        //Se busca por persona si tiene una entrada registrada
        const recordFound = await this.recordEntryService.findInRecordEntryByPersonInside(recordEntry.person);

        if (recordFound && !recordFound.out) {
            //Se registra la salida
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Your departure has been recorded. Have a nice rest of the day.',
                data: await this.recordEntryService.recordCheckOutOfPerson(recordFound)
            });
        }
        //Se registra la entrada.
        return customResponse({
            status: HttpStatus.CREATED,
            message: 'The entry has been registered.',
            data: await this.recordEntryService.checkInEntryOfPerson(recordEntry)
        });

    }

    @Post('device')
    async postRecordEntryNewDevice(
        @Res() res,
        @Body() recordEntryDevice: RecordEntryNewDeviceDto
        ) {
        let data: RecordDevice = null;
        try {
            data = await this.recordEntryService.registerNewDeviceEntry(recordEntryDevice)
        } catch (error) {
            debug(error);
        }
        const { status, message } = await this.recordEntryService.getRequestStatus();
        return res.status(status).send(
            customResponse({
                status: status,
                message: message,
                data: data
            })
        )
    }

    @Post('device/in-out')
    @HttpCode(201)
    async postRecordEntryDevice(@Body() recordEntryDevice: RecordEntryDeviceDto) {
        const { message, data } = await this.recordEntryService.registerDeviceEntry(recordEntryDevice);
        return customResponse({
            status: HttpStatus.CREATED,
            message,
            data
        })
    }

    @Post('vehicle')
    @HttpCode(201)
    async postRecordEntryNewVehicle(@Body() recordEntryVehicle: RecordNewVehicleDto) {
        return customResponse({
            status: HttpStatus.CREATED,
            message: "Vehicle entry has been registered.",
            data: await this.recordEntryService.registerNewVehicle(recordEntryVehicle)
        })
    }

    @Post('vehicle/in-out')
    @HttpCode(201)
    async PostRecordToVehicle(@Body() recordVehicle: RecordVehicleDto) {
        const { data, message } = await this.recordEntryService.registerVehicle(recordVehicle);
        return customResponse({
            status: HttpStatus.CREATED,
            message,
            data
        });
    }

    @Get()
    async getAllRecords(@Query() pageOptionsDto: PageOptionsDto<RecordEntryDto>): Promise<ICustomResponse> {
        //console.log(typeof pageOptionsDto.keyWords);
        const { data, meta } = await this.recordEntryService.findAllRecord(pageOptionsDto)

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
