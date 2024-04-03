import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitys/user.entity';
import { RolesModule } from './roles.module';
import { QueuesModule } from 'src/queues/queues.module';
import { Role } from 'src/entitys/roles.entity';
import { SSEController } from 'src/controllers/server_side_events';
import { UploadLogs } from 'src/entitys/upload_logs.entity';
import { UploadLogsModule } from './upload_log.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Role,UploadLogs]),RolesModule,QueuesModule,UploadLogsModule],
  providers: [UserService],
  controllers: [UserController, SSEController],
  exports: [UserService]
})
export class UserModule {}
