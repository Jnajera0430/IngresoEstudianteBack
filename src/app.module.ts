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
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    username:'developer',
    password:'1ngreso-3studiantes',
    host:'ie.elprogramador.co',
    port: 5432,
    database:'IngresoEstudiantes',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }), UserModule, UserRolesModule, RolesModule, PersonModule, GroupModule, CareerModule, PersonTypeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
