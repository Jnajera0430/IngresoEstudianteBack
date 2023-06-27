import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueuesService } from './queues.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'myQueue', // Asegúrate de que el nombre coincida con el utilizado en @InjectQueue
    }),
  ],
  providers: [QueuesService],
  exports: [QueuesService]
})
export class QueuesModule { }
