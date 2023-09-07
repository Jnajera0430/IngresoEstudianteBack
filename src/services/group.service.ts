import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entitys/group.entity';
import { Repository } from 'typeorm';
import { CareerService } from './career.service';
import { Career } from 'src/entitys/career.entity';
import { CreateGroup, UpdateGroupDto } from 'src/dto/group/group.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private readonly groupReposotory: Repository<Group>,
        private readonly careerService: CareerService
    ) { }

    async createGroup(group: CreateGroup): Promise<Group> {
        const newGroup = this.groupReposotory.create(group);
        // const career: Career = await this.careerService.findById(group.career.id);
        // newGroup.career = career;
        return await this.groupReposotory.save(newGroup);
    }

    async listAllGroups() {
        return await this.groupReposotory.find({
            relations: ["career", "students"]
        })
    }

    async listAllActiveGroups() {
        return await this.groupReposotory.find({
            where: {
                state: true
            },
            relations: ["career", "students"]
        })
    }

    async listGroupByCode(code: number) {
        return await this.groupReposotory.findOne({
            where: {
                code: code
            },
            relations: ["career", "students"]
        })
    }

    async getGroupByCode(code: number) {
        return [ await this.groupReposotory.findOne({
            where: {
                code: code
            },
            relations: ["career", "students"]
        })]
    }

    async findListGroupByCareer(idCareer: number) {
        return await this.groupReposotory.find({
            where: {
                career: {
                    id: idCareer
                }
            },
            relations: ["career", "students"]
        })
    }

    async updateGroup(group: UpdateGroupDto) {
        const oldGroup: Group = await this.groupReposotory.findOne({
            where: {
                id: group.id
            }
        });
        if (!oldGroup) {
            throw new NotFoundException('Group not found')
        }
        await this.groupReposotory.update(group.id, group);
        return await this.groupReposotory.findOne({
            where: {
                id: group.id
            },
            relations: ["career", "students"]
        });
    }
}
