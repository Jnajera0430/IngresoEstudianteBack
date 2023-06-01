import { Module } from '@nestjs/common';
import { PersonTypeService } from './person_type.service';
import { PersonTypeController } from './person_type.controller';

@Module({
  providers: [PersonTypeService],
  controllers: [PersonTypeController]
})
export class PersonTypeModule {}
