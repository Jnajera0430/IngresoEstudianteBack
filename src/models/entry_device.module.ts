import { Module } from '@nestjs/common';
import { EntryDeviceController } from '../controllers/entry_device.controller';
import { EntryDeviceService } from '../services/entry_device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record_entry } from 'src/entitys/record_entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Record_entry])],
  controllers: [EntryDeviceController],
  providers: [EntryDeviceService]
})
export class EntryDeviceModule {}
