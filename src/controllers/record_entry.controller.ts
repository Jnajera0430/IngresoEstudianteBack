import { Body, Controller, Get, Post, Param, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { debug } from 'console';
import { FindPersonDocumentDto, FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { FindRecordEntryOfPersonDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { ICustomResponse, customResponse } from 'src/services/customResponse.service';
import { RecordEntryService } from 'src/services/record_entry_and_out.service';

@Controller('records')
@ApiTags('Api-records')
export class RecordEntryController {
    constructor(
        private readonly recordEntryService: RecordEntryService
    ) { }

    @Post()
    async postRecordPerson(@Body() recordEntry: FindRecordEntryOfPersonDto): Promise<ICustomResponse> {
        try {

            const recordFound = await this.recordEntryService.findInRecordEntryByPersonInside(recordEntry.person);
            if (!recordFound) {
                return customResponse({
                    status: HttpStatus.ACCEPTED,
                    message: 'This person has been inside',
                    data: await this.recordEntryService.checkInEntryOfPerson(recordEntry)
                })
            }
            const data = new FindRecordEntryOfPersonDto(recordFound);
            console.log({ data });
            return customResponse({
                status: HttpStatus.ACCEPTED,
                message: 'Your process has been successfull',
                data: await this.recordEntryService.recordCheckOutOfPerson(data)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get()
    async getAllRecords() {
        return await this.recordEntryService.findAllRecord();
    }

    @Get(':id')
    async getRecordById(@Param('id') id: number) {
        return await this.recordEntryService.findRecordById(id);
    }

    @Get('person')
    async getAllRecordByperson(@Body() person: FindPersonDocumentDto) {
        return await this.recordEntryService.findAllRecordsByPerson(person);
    }

    @Get('person/in')
    async getRecordOfPersonInside(@Body() person: FindPersonDocumentDto) {
        return await this.recordEntryService.findInRecordEntryPersonIn(person);
    }
}
