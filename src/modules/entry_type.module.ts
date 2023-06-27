import { Module } from '@nestjs/common';
import { EntryTypeService } from '../services/entry_type.service';
import { EntryTypeController } from '../controllers/entry_type.controller';

@Module({
  providers: [EntryTypeService],
  controllers: [EntryTypeController]
})
export class EntryTypeModule {}
