import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user.module';
import { UserRolesModule } from './models/user_roles.module';
import { RolesModule } from './models/roles.module';
import { PersonModule } from './models/person.module';
import { GroupModule } from './models/group.module';
import { CareerModule } from './models/career.module';
import { PersonTypeModule } from './models/person_type.module';
import { RecordEntryModule } from './models/record_entry.module';
import { EntryTypeModule } from './models/entry_type.module';
import { EntryDeviceModule } from './models/entry_device.module';
import { DeviceModule } from './models/device.module';
import { DeviceTypeModule } from './models/device_type.module';
import { VehicleModule } from './models/vehicle.module';
import { VehicleTypeModule } from './models/vehicle_type.module';
import { EntryVehicleModule } from './models/entry_vehicle.module';
import {TypeOrmModule}  from '@nestjs/typeorm';
import {configuration} from './config/configuration'
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      inject: [ConfigService]}), UserModule, UserRolesModule, RolesModule, PersonModule, GroupModule, CareerModule, PersonTypeModule, RecordEntryModule, EntryTypeModule, EntryDeviceModule, DeviceModule, DeviceTypeModule, VehicleModule, VehicleTypeModule, EntryVehicleModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
