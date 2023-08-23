import { Injectable } from '@nestjs/common';
import { BullQueueProcessor, InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
import { FILE_ONE_UPLOAD_WORKER, FILE_UPLOAD_QUEUE } from 'src/constants/queues';
import { FilesConsumer } from './consumers/files.consumer';
import { DataOfFileExcel } from 'src/dto/person/personFile.dto';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(FILE_UPLOAD_QUEUE) private readonly fileManageQueue: Queue,
    private readonly fileWorker: FilesConsumer,
  ) { }

  /**
   * Worker
   */
  //private readonly myQueueWorker:MyQueueProcesosr
  async addTask(data: DataOfFileExcel) {
    // this.myQueue.process((job: Job, done: DoneCallback) =>
    //   this.myQueueWorker.processFile(data, job, done),
    // );

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

}
