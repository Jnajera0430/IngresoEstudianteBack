import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { BullModule } from '@nestjs/bull';
import { TokenMiddleware } from './middlewares/jwt/token.middleware';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleTypeController } from './controllers/vehicle_type.controller';
import { UserController } from './controllers/user.controller';
import { RolesController } from './controllers/roles.controller';
import { RecordEntryController } from './controllers/record_entry.controller';
import { PersonController } from './controllers/person.controller';
import { PersonTypeController } from './controllers/person_type.controller';
import { GroupController } from './controllers/group.controller';
import { EntryVehicleController } from './controllers/entry_vehicle.controller';
import { EntryTypeController } from './controllers/entry_type.controller';
import { EntryDeviceController } from './controllers/entry_device.controller';
import { DeviceController } from './controllers/device.controller';
import { DeviceTypeController } from './controllers/device_type.controller';
import { CareerController } from './controllers/career.controller';
import { ValidUser } from './middlewares/jwt/validUser.middleware';

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
    , BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST'),
          username:configService.get('REDIS_USER'),
          password:configService.get('REDIS_PASS')
        },
      }),
      inject: [ConfigService],
    }), RolesModule, UserModule, PersonModule, GroupModule, CareerModule, PersonTypeModule, RecordEntryModule, EntryTypeModule, EntryDeviceModule, DeviceModule, DeviceTypeModule, VehicleModule, VehicleTypeModule, EntryVehicleModule, AuthModule, QueuesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(VehicleController, VehicleTypeController, UserController, RolesController, RecordEntryController, PersonController, PersonTypeController, GroupController, EntryVehicleController, EntryTypeController, EntryDeviceController, DeviceController, DeviceTypeController, CareerController);

    consumer
      .apply(ValidUser)
      .forRoutes(UserController)
  }
}
