import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePerson, UpdatePerson } from 'src/dto/person/person.dto';
import { PersonService } from 'src/services/person.service';

@Controller('person')
@ApiTags('Api-Person')
export class PersonController {
    constructor(
        private readonly personService: PersonService
    ) { }

    @Get()
    async getListPerson() {
        return await this.personService.getPeople();
    }

    @Get(':id')
    async getPersonById(@Param('id',ParseIntPipe) id: number) {
        return await this.personService.getPersonById(id);
    }

    @Post()
    async postCreatePerson(newPerson: CreatePerson) {
        return await this.personService.createPerson(newPerson);
    }

    @Patch()
    async patchUpdatePerson(@Body() person:UpdatePerson){
        return await this.personService.updatePerson(person);
    }
}
