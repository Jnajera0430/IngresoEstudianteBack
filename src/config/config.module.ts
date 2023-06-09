import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigServiceEnv } from './config.service';

@Module({
    imports:[ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: '.env'
    })],
    controllers:[],
    providers: [ConfigService,ConfigServiceEnv],
    exports:[ConfigServiceEnv]
})
export class ConfigModuleEnv{}
