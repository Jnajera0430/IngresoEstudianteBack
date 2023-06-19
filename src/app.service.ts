import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getHello() {
    //return this.configService.get('DB_HOST');
    return 'server iniciado'
  }
}
