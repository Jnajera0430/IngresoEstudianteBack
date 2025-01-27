import { Module } from '@nestjs/common';
import { RolesController } from '../controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadLogs } from 'src/entitys/upload_logs.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UploadLogs])],
  providers: [],
  controllers: [],
  exports:[]
})
export class UploadLogsModule {}
