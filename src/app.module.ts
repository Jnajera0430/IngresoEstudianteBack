import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { RolesModule } from './roles/roles.module';
import { PersonModule } from './person/person.module';
import { GroupModule } from './group/group.module';
import { CareerModule } from './career/career.module';
import { PersonTypeModule } from './person_type/person_type.module';
import {TypeOrmModule}  from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { ConfigModule, ConfigService } from  '@nestjs/config/dist';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities:[__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
  }), UserModule, UserRolesModule, RolesModule, PersonModule, GroupModule, CareerModule, PersonTypeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
