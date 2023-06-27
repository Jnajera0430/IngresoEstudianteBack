import { Module } from '@nestjs/common';
import { PersonTypeService } from '../services/person_type.service';
import { PersonTypeController } from '../controllers/person_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { PersonType } from 'src/entitys/person_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Person,PersonType])],
  providers: [PersonTypeService],
  controllers: [PersonTypeController]
})
export class PersonTypeModule {}
