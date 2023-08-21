import { Module } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { GroupController } from '../controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { Career } from 'src/entitys/career.entity';
import { Group } from 'src/entitys/group.entity';
import { CareerModule } from './career.module';
@Module({
  imports:[TypeOrmModule.forFeature([Person,Career,Group]),CareerModule],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
