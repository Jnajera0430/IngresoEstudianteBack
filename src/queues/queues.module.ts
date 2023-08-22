import { FILE_UPLOAD_QUEUE } from '../constants/queues';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueuesService } from './queues.service';
import { join } from 'path';
import * as glob from 'glob';
import { FileService } from './files/files.service';
import { MulterModule } from '@nestjs/platform-express';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/BullAdapter';
import { FilesConsumer } from './consumers/files.consumer';
import { UserModule } from 'src/modules/user.module';
import { PersonModule } from 'src/modules/person.module';
import { PersonService } from 'src/services/person.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        preservePath: true,
        storage: true,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: 'dev.elprogramador.co',
        port: 6379,
        username: 'default',
        password: 'r3d!s-(P1A)S3CuR3_P@ssw0rd',
      },
    }),
    BullModule.registerQueue({
      name: FILE_UPLOAD_QUEUE,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    BullBoardModule.forFeature({
      name: FILE_UPLOAD_QUEUE,
      adapter: BullAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
    PersonModule,
  ],
  providers: [QueuesService, FileService, FilesConsumer],
  exports: [QueuesService, FileService],
})
export class QueuesModule {}
