import { Module } from '@nestjs/common';
import { CareerController } from '../controllers/career.controller';
import { CareerService } from '../services/career.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entitys/group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Group])],
  controllers: [CareerController],
  providers: [CareerService]
})
export class CareerModule {}
