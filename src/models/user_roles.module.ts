import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesController } from '../controllers/user_roles.controller';
import { UserRolesService } from '../services/user_roles.service';
import { Users } from '../entitys/user.entity';
import { Roles } from '../entitys/roles.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  controllers: [UserRolesController],
  providers: [UserRolesService]
})
export class UserRolesModule { }
