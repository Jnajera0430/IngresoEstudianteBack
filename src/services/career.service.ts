import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCareerDto, FindCareerDto, UpdateOrFindCareer } from 'src/dto/career/career.dto';
import { Career } from 'src/entitys/career.entity';
import { Group } from 'src/entitys/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career) private readonly careerRepository: Repository<Career>,
    ) { }

    
    async listCareer(){
        return await this.careerRepository.find({
            relations:["groups"]
        });
    }

    async createCareer(career: CreateCareerDto) {
        const newCareer = this.careerRepository.create(career);
        return await this.careerRepository.save(newCareer);
    }

    async findByName(career: FindCareerDto) {
        const fichaFound = await this.careerRepository.findOne({
            where: {
                name: career?.name
            },
            //relations:["groups"]
        });
        // if(!fichaFound){
        //     //se tiene que hacer la excepcion 
        //     throw new NotFoundException("Career not found")
        // }
        return fichaFound;
    }

    async findById(id: number): Promise<Career> {
        const foundFicha = this.careerRepository.findOne({
            where: {
                id
            },
            relations:["groups"]
        });

        return foundFicha;
    }

    async updateCareer(careerUpdated: UpdateOrFindCareer) {
        const foundCareer: Career = await this.careerRepository.findOne({
            where: {
                id: careerUpdated.id
            },
            relations:["groups"]
        });

        if (!foundCareer) {
            throw new NotFoundException("Career not found");
        }

        await this.careerRepository.update(careerUpdated.id, careerUpdated);
        return await this.careerRepository.findOne({
            where: {
                id: careerUpdated.id
            },
            relations:["groups"]
        });
    }
}
