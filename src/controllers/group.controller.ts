import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroup, UpdateGroupDto } from 'src/dto/group/group.dto';
import { Group } from 'src/entitys/group.entity';
import { GroupService } from 'src/services/group.service';
import { Repository } from 'typeorm';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }

    @Get()
    async getListAllGroups() {
        return await this.groupService.listAllGroups();
    }

    @Get('byActive')
    async getListGroupActive() {
        return await this.groupService.listAllActiveGroups();
    }

    @Get('byCodeGroup/:code')
    async getListGroupByCode(@Param('code') code: number) {
        return await this.groupService.listGroupByCode(code);
    }

    @Get('byCareer/:id')
    async getListGroupsByCareer(@Param('id') id: number) {
        return await this.groupService.findListGroupByCareer(id);
    }

    @Post()
    async postCreateGroup(@Body() newGroup: CreateGroup) {
        return await this.groupService.createGroup(newGroup);
    }

    @Patch()
    async patchUpdateGroup(@Body() group: UpdateGroupDto) {
        return await this.groupService.updateGroup(group);
    }
}
