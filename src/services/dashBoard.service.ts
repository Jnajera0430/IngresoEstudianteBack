import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';
import { Repository, Between, IsNull } from 'typeorm';
import { RecordEntryService } from './record_entry_and_out.service';
import { ParameterDateDto } from 'src/dto/page/parameterDate.dto';

@Injectable()
export class DashBoardService {
  constructor(
    @InjectRepository(Record_entry)
    private readonly recordRepository: Repository<Record_entry>,
    private readonly recordService: RecordEntryService,
  ) {}

  async statisticsRecords(paramDateDto: ParameterDateDto) {
    //la grafuca
    let linear_graph_per_hour: string[] | (string | number)[][] | string = [
      ['HOURS', 'PEOPLE COUNT'],
    ];
    const today = new Date();
    //personas que han entrado en las ultimas 24 horas
    const people_last_24h = await this.recordRepository.countBy({
      checkIn: Between(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
        ),
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
        ),
      ),
    });
    //personas que estan dentro del edificio
    const peopleInside = await this.recordRepository.countBy({
      checkIn: Between(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
        ),
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
        ),
      ),
      checkOut: IsNull(),
    });
    //personas que han entrado por hora en especifico
    for (let i = 0; i < 24; i++) {
      //se crea un rango de horas
      let start = `${i < 10 ? `0${i}` : i}:00`;
      let end = `${i < 10 ? `0${i}` : i}:59`;
      //se cuenta cuantas personas han entrado en ese rango de horas
      let peopleCount = await this.recordRepository.countBy({
        checkIn: Between(
          new Date(
            paramDateDto.fromYear,
            paramDateDto.fromMonth,
            paramDateDto.fromDay,
            i,
            0,
            0,
          ),
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            i,
            59,
            59,
          ),
        ),
      });
      //se agrega al arreglo
      linear_graph_per_hour.push([`${start} - ${end}`, peopleCount]);
    }
    //se retorna la informacion
    return {
      people_last_24h,
      peopleInside,
      linear_graph_per_hour,
    };
  }
}
