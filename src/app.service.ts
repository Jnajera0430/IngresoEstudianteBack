import { ConfigService } from '@nestjs/config/dist';
import { Injectable } from '@nestjs/common';
import { ConfigServiceEnv } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    //return this.configService.get('DB_HOST');
  }
}
