import { Module } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesController } from '../controllers/roles.controller';
import { Roles } from 'src/entitys/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Roles])],
  providers: [RolesService],
  controllers: [RolesController],
  exports:[RolesService]
})
export class RolesModule {}
