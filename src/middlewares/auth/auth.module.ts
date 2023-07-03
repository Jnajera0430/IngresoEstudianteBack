import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/modules/roles.module';
import { ConfigModuleEnv } from 'src/config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, RolesModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:(configService: ConfigService)=>({
      secret: configService.get('SECRET_KEY_JWT') || 'secretKey'
    }),
    global: true,
    inject:[ConfigService]
  }), ConfigModuleEnv],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
