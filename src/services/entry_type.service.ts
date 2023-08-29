import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryTypeDto, UpdateEntryTypeDto } from 'src/dto/recordsEntry/entryType.dto';
import { EntryType } from 'src/entitys/entry_type.entity';
import { ValueNotFound } from 'src/exceptions/customExcepcion';
import { Repository } from 'typeorm';

@Injectable()
export class EntryTypeService implements OnModuleInit {
    constructor(
        @InjectRepository(EntryType) private readonly entryTypeRepository: Repository<EntryType>
    ) { }

    async createEntryType(entryType: CreateEntryTypeDto): Promise<EntryType> {
        const newEntryType = this.entryTypeRepository.create(entryType);
        return await this.entryTypeRepository.save(newEntryType);
    }

    async updateEntryType(entryType: UpdateEntryTypeDto): Promise<EntryType> {
        const entryTypeFound = await this.entryTypeRepository.findOne({
            where: {
                id: entryType.id
            }
        });
        if (!entryTypeFound) {
            throw new ValueNotFound('That type not found');
        }
        const [_, entryTypeUpdated] = await Promise.all([
            this.entryTypeRepository.update(entryTypeFound.id, entryType),
            this.entryTypeRepository.findOne({
                where: {
                    id: entryType.id
                }
            }),
        ]);
        return entryTypeUpdated;
    }

    async findEntryTypeByid(id: number): Promise<EntryType> {
        return await this.entryTypeRepository.findOne({
            where: {
                id
            }
        });
    }

    async findEntryTypeByName(type: string): Promise<EntryType> {
        return await this.entryTypeRepository.findOne({
            where: {
                type
            }
        });
    }


    async onModuleInit() {
        const entryTypes: CreateEntryTypeDto[] = [
            {
                type: 'Aprendiz'
            },
            {
                type: 'Docente'
            },
            {
                type: 'Seguridad'
            },
            {
                type: 'Administrativo'
            },
            {
                type: 'Visitante'
            }
        ];

        const countEntryType = await this.entryTypeRepository.count();
        if (countEntryType === 0) {
            for (let entryType of entryTypes) {
                this.createEntryType(entryType);
            }
            console.log('All entry types have been created');
        }
    }
}
