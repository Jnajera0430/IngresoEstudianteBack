import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitys/user.entity';
import { RolesModule } from './roles.module';
import { QueuesModule } from 'src/queues/queues.module';
import { Role } from 'src/entitys/roles.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Role]),RolesModule,QueuesModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
