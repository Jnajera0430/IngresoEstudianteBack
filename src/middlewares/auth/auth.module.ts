import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/models/roles.module';
import { ConfigModuleEnv } from 'src/config/config.module';
import { ConfigServiceEnv } from 'src/config/config.service';



@Module({
  imports: [UserModule, RolesModule,JwtModule.register({
    global: true,
    secret:"dsajhdasjh"
  }), ConfigModuleEnv],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
