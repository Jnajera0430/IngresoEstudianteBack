import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesController } from './user_roles.controller';
import { UserRolesService } from './user_roles.service';
import { Users } from '../user/user.entity';
import { Roles } from '../roles/roles.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  controllers: [UserRolesController],
  providers: [UserRolesService]
})
export class UserRolesModule { }
