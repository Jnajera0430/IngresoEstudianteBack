import { Module } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { GroupController } from '../controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { Career } from 'src/entitys/career.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Person,Career])],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
