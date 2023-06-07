import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { UserModule } from './models/user.module';
import { UserRolesModule } from './models/user_roles.module';
import { RolesModule } from './models/roles.module';
import { PersonModule } from './models/person.module';
import { GroupModule } from './models/group.module';
import { CareerModule } from './models/career.module';
import { PersonTypeModule } from './models/person_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UserRolesModule,
    RolesModule,
    PersonModule,
    GroupModule,
    CareerModule,
    PersonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
