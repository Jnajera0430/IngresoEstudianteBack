import { Module } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { PersonController } from '../controllers/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Device } from 'src/entitys/device.entity';
import { Vehicle } from 'src/entitys/vehicle.entity';
import { Person } from 'src/entitys/person.entity';
import { DoctType } from 'src/entitys/doctType.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Group, PersonType, Device, Vehicle,Person,DoctType])],
  providers: [PersonService],
  controllers: [PersonController]
})
export class PersonModule {}
