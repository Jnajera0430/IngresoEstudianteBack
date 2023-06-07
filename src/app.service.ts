import { ConfigService } from '@nestjs/config/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return this.configService.get('DB_HOST');
  }
}
