import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
interface configDB{
    DB_USER: string;
    DB_PASS: string;
}
@Module({
    imports:[ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: '.env'
    })],
    controllers:[ConfigService],
    providers: [ConfigService]

})
export class ConfigModuleEnv{
    constructor(private configService: ConfigService) {
        const dbUser = this.configService.get<String>('DB_USER');
        const dbPassword = this.configService.get<String>('DB_PASS');
        const dbName = this.configService.get<String>('DB_NAME');
        const dbPort = this.configService.get<Number>('DB_PORT');
        
    }
}
