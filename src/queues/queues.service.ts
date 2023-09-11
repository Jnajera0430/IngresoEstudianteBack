import { Injectable, Logger } from '@nestjs/common';
import { BullQueueProcessor, InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
import {
  FILE_ONE_UPLOAD_WORKER,
  FILE_UPLOAD_QUEUE,
} from 'src/constants/queues';
import { FilesConsumer } from './consumers/files.consumer';
import { DataOfFileExcel } from 'src/dto/person/personFile.dto';
//import { Subject } from 'rxjs';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(FILE_UPLOAD_QUEUE) private readonly fileManageQueue: Queue,
    private readonly fileWorker: FilesConsumer,
  ) {}

  /**
   * Worker
   */
  //private readonly myQueueWorker:MyQueueProcesosr
  async addTask(data: DataOfFileExcel) {
    // this.myQueue.process((job: Job, done: DoneCallback) =>
    //   this.myQueueWorker.processFile(data, job, done),
    // );
    console.log('llego');
    return await this.fileManageQueue.add(FILE_ONE_UPLOAD_WORKER, data);
  }

  async eventOfQueues() {
    this.fileManageQueue.on('progress', function (job, progress) {
      console.log(`id: ${job.id} - task completed`, { progress });
    });

    // this.fileManageQueue.on('failed', function (job, err) {
    //   // A job failed with reason `err`!
    // })

    // this.fileManageQueue.on('removed', function (job) {
    //   // A job successfully removed.
    // });
  }

  async eventComplete() {
    this.fileManageQueue.on('completed', (job: Job, result) => {
      console.log(`id: ${job.id} - task completed`, { result });
    });
  }

  logger = new Logger(FilesConsumer.name);

  async getActivesProgressByUserID(userID: number = 0) {
    const elmLength = await this.fileManageQueue.getActiveCount();
    this.logger.debug(elmLength);
    if (elmLength > 0) {
      const activeJobs = await this.fileManageQueue.getActive();
      let jobs = []
      activeJobs.map(async (job) => {
        const p = await (await this.fileManageQueue.getJob(job.id)).progress()
        this.logger.debug(p);
        jobs.push({
          id: ''
        })
      });
      return jobs;
    }
    return {
      message: 'No hay tareas activas',
      status: 404,
      data: []
    }
  }

}
