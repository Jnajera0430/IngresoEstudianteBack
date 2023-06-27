import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { UserModule } from './modules/user.module';
import { RolesModule } from './modules/roles.module';
import { PersonModule } from './modules/person.module';
import { GroupModule } from './modules/group.module';
import { CareerModule } from './modules/career.module';
import { PersonTypeModule } from './modules/person_type.module';
import { RecordEntryModule } from './modules/record_entry.module';
import { EntryTypeModule } from './modules/entry_type.module';
import { EntryDeviceModule } from './modules/entry_device.module';
import { DeviceModule } from './modules/device.module';
import { DeviceTypeModule } from './modules/device_type.module';
import { VehicleModule } from './modules/vehicle.module';
import { VehicleTypeModule } from './modules/vehicle_type.module';
import { EntryVehicleModule } from './modules/entry_vehicle.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { QueuesModule } from './queues/queues.module';

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

      inject: [ConfigService]
    }) 
    , UserModule, RolesModule, PersonModule, GroupModule, CareerModule, PersonTypeModule, RecordEntryModule, EntryTypeModule, EntryDeviceModule, DeviceModule, DeviceTypeModule, VehicleModule, VehicleTypeModule, EntryVehicleModule, AuthModule, QueuesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
