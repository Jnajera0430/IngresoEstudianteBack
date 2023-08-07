import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from 'src/entitys/career.entity';
import { Group } from 'src/entitys/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career) private readonly careerRepository:Repository<Career>,
    ){}
    

    async createCareer(career:any){
        const newCareer = this.careerRepository.create(career);
        await this.careerRepository.save(newCareer);
        return newCareer;
    }

    async findByName(career:any){
        const fichaFound = this.careerRepository.findOne({
            where:{
                name: career?.name
            },
        });
    }

    async findById(career:Career):Promise<Career>{
        const foundFicha = this.careerRepository.findOne({
            where:{
                id: career.id
            },
        });

        return foundFicha;
    }
}
