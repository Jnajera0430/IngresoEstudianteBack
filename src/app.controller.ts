import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    description: 'Ejemplo get'
  })
  getHello() {
    return this.appService.getHello();
  }
}
