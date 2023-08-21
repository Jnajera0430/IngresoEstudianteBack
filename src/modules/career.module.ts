import { Module } from '@nestjs/common';
import { CareerController } from '../controllers/career.controller';
import { CareerService } from '../services/career.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entitys/group.entity';
import { Career } from 'src/entitys/career.entity';
import { GroupModule } from './group.module';

@Module({
  imports:[TypeOrmModule.forFeature([Career])],
  controllers: [CareerController],
  providers: [CareerService],
  exports:[CareerService]
})
export class CareerModule {}
