import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { abstractBodyExample } from 'src/document/body.document';
import { abstractResponseOk } from 'src/document/responses.200';
import { abstracResponseErrorExample } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { CreatePerson, UpdatePerson } from 'src/dto/person/person.dto';
import { PersonService } from 'src/services/person.service';

@Controller('person')
@ApiTags('Api-Person')
export class PersonController {
    constructor(
        private readonly personService: PersonService
    ) { }

    @Get()
    @ApiOperation({
        summary: "people list",
        description: 'Endpoint to list all people',
    })
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'List people',
        description: 'Example response of list of people',
        data: [
            {
                id: 1212,
                firtsName: 'Lazlo Gabriel',
                lastName: 'Caputo Arias',
                docType: {
                    id: 1,
                    type: 'CC'
                },
                document: 1002148455,
                state: true,
                personTypes: {
                    id: 1,
                    name: 'Aprendiz'
                },
                groups: [],
                device: [],
                vehicles: [],
                recordEntry: []
            },
            {
                id: 1212,
                firtsName: 'Lazlo Gabriel',
                lastName: 'Caputo Arias',
                docType: {
                    id: 1,
                    type: 'CC'
                },
                document: 1002148455,
                state: true,
                personTypes: {
                    id: 1,
                    name: 'Aprendiz'
                },
                groups: [],
                device: [],
                vehicles: [],
                recordEntry: []
            }
        ]
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListPerson() {
        return await this.personService.getPeople();
    }

    @Get(':id')
    @ApiOperation({
        summary: "Search a person by id",
        description: 'Endpoint to search person by id',
    })
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'One person by code',
        description: 'Example response of person',
        data: {
            id: 1212,
            firtsName: 'Lazlo Gabriel',
            lastName: 'Caputo Arias',
            docType: {
                id: 1,
                type: 'CC'
            },
            document: 1002148455,
            state: true,
            personTypes: {
                id: 1,
                name: 'Aprendiz'
            },
            groups: [],
            device: [],
            vehicles: [],
            recordEntry: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getPersonById(@Param('id', ParseIntPipe) id: number) {
        return await this.personService.getPersonById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new person",
        description: 'Endpoint to create a new person',
    })
    @ApiBody(abstractBodyExample({
        type: "CreatePerson",
        description: 'Values required to create a new person',
        required: true,
        example1: {
            summary: 'data required to create a person',
            value: {
                firtsName: 'string',
                lastName: 'string',
                document: 'string',
                docType: 'DoctType',
                personTypes: 'PersonType'
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'A new person has been created',
        description: 'Example of a response when creating a new person',
        data: {
            id: 1212,
            firtsName: 'Lazlo Gabriel',
            lastName: 'Caputo Arias',
            docType: {
                id: 1,
                type: 'CC'
            },
            document: 1002148455,
            state: true,
            personTypes: {
                id: 1,
                name: 'Aprendiz'
            },
            groups: [],
            device: [],
            vehicles: [],
            recordEntry: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async postCreatePerson(newPerson: CreatePerson) {
        return await this.personService.createPerson(newPerson);
    }

    @Patch()
    @ApiOperation({
        summary: "Update to a person",
        description: 'Endpoint to edit a person',
    })
    @ApiBody(abstractBodyExample({
        type: "UpdatePerson",
        description: 'Values required to edit a person',
        required: true,
        example1: {
            summary: 'data required to edit a person',
            value: {
                id: 'number',
                'firtsName?': 'string',
                'lastName?': 'string',
                'document?': 'string',
                'state?': 'boolean',
                'docType?': 'DoctType',
                'personTypes?': 'PersonType',
                'groups?': 'Group[]',
                'device?': 'Device[]',
                'vehicles?': 'Vehicle[]',
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'A person has been updated',
        description: 'Example of a response when update a person',
        data: {
            id: 1212,
            firtsName: 'Lazlo Gabriel',
            lastName: 'Caputo Arias',
            docType: {
                id: 1,
                type: 'CC'
            },
            document: 1002148455,
            state: true,
            personTypes: {
                id: 1,
                name: 'Aprendiz'
            },
            groups: [],
            device: [],
            vehicles: [],
            recordEntry: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async patchUpdatePerson(@Body() person: UpdatePerson) {
        return await this.personService.updatePerson(person);
    }
}
