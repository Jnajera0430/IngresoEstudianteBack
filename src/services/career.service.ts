import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCareerDto, UpdateOrFindCareer } from 'src/dto/career/career.dto';
import { Career } from 'src/entitys/career.entity';
import { Group } from 'src/entitys/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career) private readonly careerRepository: Repository<Career>,
    ) { }


    async createCareer(career: CreateCareerDto) {
        const newCareer = this.careerRepository.create(career);
        await this.careerRepository.save(newCareer);
        return newCareer;
    }

    async findByName(career: UpdateOrFindCareer) {
        const fichaFound = this.careerRepository.findOne({
            where: {
                name: career?.name
            },
        });
    }

    async findById(career: UpdateOrFindCareer): Promise<Career> {
        const foundFicha = this.careerRepository.findOne({
            where: {
                id: career.id
            },
        });

        return foundFicha;
    }

    async updateCareer(careerUpdate: UpdateOrFindCareer) {
        const foundCareer: Career = await this.careerRepository.findOne({
            where: {
                id: careerUpdate.id
            }
        });

        if (!foundCareer) {
            throw new NotFoundException("Career not found");
        }

        await this.careerRepository.update(careerUpdate.id, careerUpdate);
        return await this.careerRepository.findOne({
            where: {
                id: careerUpdate.id
            }
        });
    }
}
