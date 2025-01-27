import { Module } from '@nestjs/common';
import { EntryTypeService } from '../services/entry_type.service';
import { EntryTypeController } from '../controllers/entry_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryType } from 'src/entitys/entry_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntryType])],
  providers: [EntryTypeService],
  controllers: [EntryTypeController],
  exports: [EntryTypeService]
})
export class EntryTypeModule { }
