import { Module } from '@nestjs/common';
import { RecordEntryController } from '../controllers/record_entry.controller';
import { RecordEntryService } from '../services/record_entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { EntryType } from 'src/entitys/entry_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Person, EntryType])],
  controllers: [RecordEntryController],
  providers: [RecordEntryService]
})
export class RecordEntryModule {}
