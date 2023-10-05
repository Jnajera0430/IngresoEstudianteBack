import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Repository, Between,IsNull } from "typeorm";
import { RecordEntryService } from "./record_entry_and_out.service";
import { ParameterDateDto } from "src/dto/page/parameterDate.dto";

@Injectable()
export class DashBoardService {
    constructor(
        @InjectRepository(Record_entry) private readonly recordRepository: Repository<Record_entry>,
        private readonly recordService: RecordEntryService
    ) { }

    async statisticsRecords(paramDateDto: ParameterDateDto) {
        let linear_graph_per_hour = [];
        const today = new Date();
        const people_last_24h = await this.recordRepository.countBy({
            checkIn: Between(
                new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0),
                new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59),
            )
        });
        for (let i = 0; i < 24; i++) {
            linear_graph_per_hour.push({
                start: `${i < 10 ? `0${i}` : i}:00`,
                end: `${i < 10 ? `0${i}` : i}:59`,
                people: await this.recordRepository.countBy({
                    checkIn: Between(
                        new Date(paramDateDto.fromYear, paramDateDto.fromMonth, paramDateDto.fromDay, i, 0, 0),
                        new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), i, 59, 59),
                    )
                })
            });
        }
        const peopleInside = await this.recordRepository.countBy({
            checkIn: Between(
                new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0),
                new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59),
            ),
            checkOut: IsNull()
        });
        
        return {
            people_last_24h,
            peopleInside,
            linear_graph_per_hour
        }
    }

}