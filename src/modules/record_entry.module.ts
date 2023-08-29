import { Module } from '@nestjs/common';
import { RecordEntryController } from '../controllers/record_entry.controller';
import { RecordEntryService } from '../services/record_entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { EntryType } from 'src/entitys/entry_type.entity';
import { Record_entry } from 'src/entitys/record_entry.entity';
import { PersonModule } from './person.module';

@Module({
  imports:[TypeOrmModule.forFeature([Person, EntryType,Record_entry]),PersonModule],
  controllers: [RecordEntryController],
  providers: [RecordEntryService]
})
export class RecordEntryModule {}
