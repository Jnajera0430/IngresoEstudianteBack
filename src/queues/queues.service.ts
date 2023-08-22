import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
import { FILE_UPLOAD_QUEUE } from 'src/constants/queues';
import { FilesConsumer } from './consumers/files.consumer';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(FILE_UPLOAD_QUEUE) private readonly myQueue: Queue,
    private readonly myQueueWorker: FilesConsumer,
  ) {}
  /**
   * Worker
   */
  //private readonly myQueueWorker:MyQueueProcesosr
  async addTask(data: any) {
    // this.myQueue.process((job: Job, done: DoneCallback) =>
    //   this.myQueueWorker.processFile(data, job, done),
    // );
    this.myQueue.add(data);
  }
}
