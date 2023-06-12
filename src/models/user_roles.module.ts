import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesController } from '../controllers/user_roles.controller';
import { UserRolesService } from '../services/user_roles.service';
import { Users } from '../entitys/user.entity';
import { Roles } from '../entitys/roles.entity'
import { User_roles } from '../entitys/user_roles.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles,User_roles])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService]
})
export class UserRolesModule {}
