import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigServiceEnv {
    constructor(private configService: ConfigService) {}

    get dbUser(): string {
      return this.configService.get<string>('DB_USER');
    }
    
    get dbPassword(): string {
      return this.configService.get<string>('DB_PASS');
    }
  
    get dbName(): string {
      return this.configService.get<string>('DB_NAME');
    }
  
    get dbPort(): number {
      return this.configService.get<number>('DB_PORT');
    }
}
