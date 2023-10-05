import { Module } from '@nestjs/common';
import { RecordEntryController } from '../controllers/record_entry.controller';
import { RecordEntryService } from '../services/record_entry_and_out.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entitys/person.entity';
import { EntryType } from 'src/entitys/entry_type.entity';
import { Record_entry } from 'src/entitys/record_entry_and_out.entity';
import { PersonModule } from './person.module';
import { EntryTypeModule } from './entry_type.module';

@Module({
  imports:[TypeOrmModule.forFeature([Person, EntryType,Record_entry]),PersonModule,EntryTypeModule],
  controllers: [RecordEntryController],
  providers: [RecordEntryService],
  exports:[RecordEntryService]
})
export class RecordEntryModule {}
