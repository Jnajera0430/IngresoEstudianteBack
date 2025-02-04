import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCareerDto, FindCareerDto, UpdateOrFindCareer } from 'src/dto/career/career.dto';
import { PageDto } from 'src/dto/page/page.dto';
import { PageMetaDto } from 'src/dto/page/pageMeta.dto';
import { PageOptionsDto } from 'src/dto/page/pageOptions.dto';
import { Career } from 'src/entitys/career.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career) private readonly careerRepository: Repository<Career>,
    ) { }


    async listCareer(pageOptionsDto?: PageOptionsDto): Promise<PageDto<Career>> {
        const [entities, itemCount] = await this.careerRepository.findAndCount({
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
            order: {
                createdAt: pageOptionsDto.order
            },
            where:{}
        })
        // const alias = "career";
        // const queryBuilder = this.careerRepository.createQueryBuilder(alias);
        // queryBuilder
        //     .leftJoinAndSelect(alias + ".groups", "groups")
        //     .orderBy(alias + ".createdAt", pageOptionsDto.order)
        //     .skip(pageOptionsDto.skip)
        //     .take(pageOptionsDto.take)
        // const itemCount = await queryBuilder.getCount();
        // const { entities } = await queryBuilder.getRawAndEntities();
        const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMeta);
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
        if (!fichaFound) {
            //se tiene que hacer la excepcion
            this.careerRepository.create(career);
            // throw new NotFoundException("Career not found")

        }
        return fichaFound;
    }

    async findById(id: number): Promise<Career> {
        const foundFicha = this.careerRepository.findOne({
            where: {
                id
            },
            relations: ["groups"]
        });

        return foundFicha;
    }

    async updateCareer(careerUpdated: UpdateOrFindCareer) {
        const foundCareer: Career = await this.careerRepository.findOne({
            where: {
                id: careerUpdated.id
            },
            relations: ["groups"]
        });

        if (!foundCareer) {
            throw new NotFoundException("Career not found");
        }

        await this.careerRepository.update(careerUpdated.id, careerUpdated);
        return await this.careerRepository.findOne({
            where: {
                id: careerUpdated.id
            },
            relations: ["groups"]
        });
    }
}
