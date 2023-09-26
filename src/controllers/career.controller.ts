import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CareerService } from '../services/career.service'
import { CreateCareerDto, UpdateOrFindCareer } from 'src/dto/career/career.dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { abstractResponseOk } from 'src/document/responses.200';
import { abstracResponseErrorExample } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { abstractBodyExample } from 'src/document/body.document';
import { customResponse } from 'src/services/customResponse.service';
import { debug } from 'console';
import { ICustomResponse } from 'src/intefaces/customResponse.interface';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';

@Controller('career')
@ApiTags('Api-Career')
export class CareerController {
    constructor(private readonly careerService: CareerService) { }

    @Get()
    @ApiOperation({
        summary: "List careers",
        description: 'Endpoint to list all careers',
    })
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'List careers',
        description: 'Example response of list of careers',
        data: [
            {
                id: 2123,
                name: 'Analisis y Desarrollo de software',
                group: []
            },
            {
                id: 2122,
                name: 'Tecnologo en sistema de la informacion',
                group: []
            },
            {
                id: 2124,
                name: 'Analista de datos',
                group: []
            },

        ]
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListCareer(@Query() pageOptionsDto: PageOptionsDto): Promise<ICustomResponse> {
        try {
            const {data,meta} = await this.careerService.listCareer(pageOptionsDto);
            return customResponse({
                status: HttpStatus.OK,
                message: 'List career',
                data,
                meta 
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Post()
    @ApiOperation({
        summary: "Create a new career",
        description: 'Endpoint to create a new career',
    })
    @ApiBody(abstractBodyExample({
        type: "CreateCareerDto",
        description: 'Values required to create a new career',
        required: true,
        example1: {
            summary: 'data required to create a career',
            value: {
                name: 'Analista de datos',
                'group?': []
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'A new person has been created',
        description: 'Example of a response when creating a new person',
        data: {
            id: 2124,
            name: 'Analista de datos',
            group: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async postCreateCareer(@Body() newCareer: CreateCareerDto): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Career has been created',
                data: await this.careerService.createCareer(newCareer)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Get(":id")
    @ApiOperation({
        summary: "search career by id",
        description: 'Endpoint to get career by id',
    })
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'Career found',
        description: 'Example response of career object',
        data: {
            id: 2123,
            name: 'Analisis y Desarrollo de software',
            group: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getCareerById(@Param('id', ParseIntPipe) id: number): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.OK,
                message: 'Career found by id.',
                data: await this.careerService.findById(id)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }

    @Patch()
    @ApiOperation({
        summary: "Update career",
        description: 'Endpoint to edit a career',
    })
    @ApiBody(abstractBodyExample({
        type: "CreateCareerDto",
        description: 'Values required to edit a career',
        required: true,
        example1: {
            summary: 'data required to edit a career',
            value: {
                id: 121,
                'name?': 'Analista de datos',
                'group?': []
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status: 200,
        message: 'A person has been updated',
        description: 'Example of a response when update a person',
        data: {
            id: 2124,
            name: 'Analista de datos',
            group: []
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async patchUpdateCareer(@Body() career: UpdateOrFindCareer): Promise<ICustomResponse> {
        try {
            return customResponse({
                status: HttpStatus.CREATED,
                message: 'Career has been updated.',
                data: await this.careerService.updateCareer(career)
            });
        } catch (error) {
            debug(error);
            return error;
        }
    }
}
