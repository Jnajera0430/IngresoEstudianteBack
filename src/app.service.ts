import { Injectable } from '@nestjs/common';
import { ConfigServiceEnv } from './config/config.service';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
