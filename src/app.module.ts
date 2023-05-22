import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule}  from '@nestjs/typeorm'
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    username:'root',
    password:'',
    host:'localhost',
    port: 3306,
    database:'nestdb',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
