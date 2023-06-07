import { Module } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesController } from '../controllers/roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
