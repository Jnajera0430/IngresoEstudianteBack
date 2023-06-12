import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user.module';
import { UserRolesModule } from 'src/models/user_roles.module'
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/models/roles.module'

@Module({
  imports: [UserModule, UserRolesModule,RolesModule,JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
