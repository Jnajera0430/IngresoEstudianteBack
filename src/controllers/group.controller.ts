import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { abstractBodyExample } from 'src/document/body.document';
import { abstractResponseOk } from 'src/document/responses.200';
import { abstracResponseErrorExample } from 'src/document/responses.400';
import { responseErrorServer } from 'src/document/responses.500';
import { CreateGroup, UpdateGroupDto } from 'src/dto/group/group.dto';
import { GroupService } from 'src/services/group.service';

@Controller('group')
@ApiTags('Api-Group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }

    @Get()
    @ApiOperation({
        summary: "Group list",
        description: 'Endpoint to list all group',
    })
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'List groups',
        description:'Example response of list of groups',
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListAllGroups() {
        return await this.groupService.listAllGroups();
    }

    @Get('byActive')
    @ApiOperation({
        summary: "Groups list",
        description: 'Endpoint to list all active groups',
    })
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'Groups list active',
        description:'Example response of list of groups active',
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListGroupActive() {
        return await this.groupService.listAllActiveGroups();
    }

    @Get('byCodeGroup/:code')
    @ApiOperation({
        summary: "Groups list by code",
        description: 'Endpoint to search group by code',
    })
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'Group by code',
        description:'Example response of list of groups active',
        data:{
            id: 846,
            code:123578545,
            dateStart: '23-08-2023 - 00:00:00',
            dateEnd: '23-08-2024 - 00:00:00',
            career:{},
            students:[]
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListGroupByCode(@Param('code', ParseIntPipe) code: number) {
        return await this.groupService.listGroupByCode(code);
    }

    @Get('byCareer/:id')
    @ApiOperation({
        summary: "Groups list by id of career",
        description: 'Endpoint to search group by id of career',
    })
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'Group by id of career',
        description:'Example response of list of groups active',
        data:{
            id: 846,
            code:123578545,
            dateStart: '23-08-2023 - 00:00:00',
            dateEnd: '23-08-2024 - 00:00:00',
            career:{},
            students:[]
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async getListGroupsByCareer(@Param('id', ParseIntPipe) id: number) {
        return await this.groupService.findListGroupByCareer(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new group",
        description: 'Endpoint to create a new group',
    })
    @ApiBody(abstractBodyExample({
        type:"CreateGroup",
        description:'Values required to create a new group',
        required: true,
        example1:{
            summary:'data required to create a group',
            value:{
                id: "number",
                code: "number",
                dateStart: "Date",
                dateEnd: "Date",
                state: "boolean",
                career: "Career",
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'group created',
        description:'Example of a response when creating a group',
        data:{
            id: 846,
            code:123578545,
            dateStart: '23-08-2023 - 00:00:00',
            dateEnd: '23-08-2024 - 00:00:00',
            career:{},
            "students?":[]
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async postCreateGroup(@Body() newGroup: CreateGroup) {
        return await this.groupService.createGroup(newGroup);
    }
    
    @Patch()
    @ApiOperation({
        summary: "Create a new group",
        description: 'Endpoint to create a new group',
    })
    @ApiBody(abstractBodyExample({
        type:"CreateGroup",
        description:'Values required to create a new group',
        required: true,
        example1:{
            summary:'data required to create a group',
            value:{
                id: 846,
                "code?":123578545,
                "dateStart?": '23-08-2023 - 00:00:00',
                "dateEnd?": '23-08-2024 - 00:00:00',
                "career?":{},
                "students?":[]
            }
        }

    }))
    @ApiResponse(abstractResponseOk({
        status:200,
        message:'group created',
        description:'Example of a response when creating a group',
        data:{
            id: 846,
            "code?":123578545,
            "dateStart?": '23-08-2023 - 00:00:00',
            "dateEnd?": '23-08-2024 - 00:00:00',
            "career?":{},
            "students?":[]
        }
    }))
    @ApiBadRequestResponse(abstracResponseErrorExample({
        error: 'An unexpected error has occurred'
    }))
    @ApiResponse(responseErrorServer())
    async patchUpdateGroup(@Body() group: UpdateGroupDto) {
        return await this.groupService.updateGroup(group);
    }
}
