import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueuesService } from './queues.service';
import { MyQueueProcesosr } from './consumers/MyQueues.worker';
import { join } from 'path';
import * as glob from 'glob'
import { FileService } from './files/files.service';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      name: 'myQueue', // Asegúrate de que el nombre coincida con el utilizado en @InjectQueue
      useFactory: async (configService: ConfigService) => {
        const pattern = join(__dirname, '/**/*.worker{.ts,.js}');
        const files = await new Promise<string[]>((resolve, reject) => {
          glob(pattern, (err, files) => {
            if (err) {
              reject(err);
            } else {
              resolve(files);
            }
          });
        });

        return {
          configKey: configService.get('gasda'),
          processors: files,
        };
      },
      inject: [ConfigService]
    },{
      imports: [ConfigModule],
      name: 'files', // Asegúrate de que el nombre coincida con el utilizado en @InjectQueue
      useFactory: async (configService: ConfigService) => {
        const pattern = join(__dirname, '/**/*.processorFile{.ts,.js}');
        const files = await new Promise<string[]>((resolve, reject) => {
          glob(pattern, (err, files) => {
            if (err) {
              reject(err);
            } else {
              resolve(files);
            }
          });
        });

        return {
          configKey: configService.get('CONFIG_KEY_FILES'),
          processors: files,
          
        };
      },
      inject: [ConfigService]
    }),
    MulterModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async ()=>({
        preservePath:true,
        storage: true
      }),
      inject:[ConfigService]
    })

  ],
  providers: [QueuesService,FileService, MyQueueProcesosr],
  exports: [QueuesService,FileService]
})
export class QueuesModule { }
