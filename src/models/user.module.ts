import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { ConfigModuleEnv } from 'src/config/config.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/user.entity';
import { RolesModule } from './roles.module';

@Module({
  imports:[ConfigModuleEnv, TypeOrmModule.forFeature([Users]),RolesModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
