import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { ConfigModuleEnv } from 'src/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/user.entity';

@Module({
  imports:[ConfigModuleEnv, TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
