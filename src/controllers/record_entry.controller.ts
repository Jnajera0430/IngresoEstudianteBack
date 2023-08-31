import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { FindPersonDocumentDto, FindPersonDto, PersonDto } from 'src/dto/person/person.dto';
import { FindRecordEntryOfPersonDto } from 'src/dto/recordsEntry/recordEntry.dto';
import { RecordEntryService } from 'src/services/record_entry_and_out.service';

@Controller('records')
export class RecordEntryController {
    constructor(
        private readonly recordEntryService: RecordEntryService
    ) { }

    @Post()
    async postRecordPerson(@Body() recordEntry: FindRecordEntryOfPersonDto) {
        const recordFound = await this.recordEntryService.findInRecordEntryPersonIn(recordEntry.person);
        if (!recordFound) {
            return await this.recordEntryService.checkInEntryOfPerson(recordEntry);
        }
        const data = new FindRecordEntryOfPersonDto(recordFound);
        console.log({ data });
        return await this.recordEntryService.checkInEntryOfPerson(data);
    }

    @Get()
    async getAllRecords(){
        return await this.recordEntryService.findAllRecord();
    }

    @Get(':id')
    async getRecordById(@Param('id') id:number){
        return await this.recordEntryService.findRecordById(id);
    }

    @Get('person')
    async getAllRecordByperson(@Body() person:FindPersonDocumentDto){
        return await this.recordEntryService.findAllRecordsByPerson(person);
    }
 
    @Get('person/in')
    async getRecordOfPersonInside(@Body() person:FindPersonDocumentDto){
        return await this.recordEntryService.findInRecordEntryPersonIn(person);
    }
}
