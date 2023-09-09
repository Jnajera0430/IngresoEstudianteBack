import { Injectable, Logger } from '@nestjs/common';
import { BullQueueProcessor, InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
import {
  FILE_ONE_UPLOAD_WORKER,
  FILE_UPLOAD_QUEUE,
} from 'src/constants/queues';
import { FilesConsumer } from './consumers/files.consumer';
import { DataOfFileExcel } from 'src/dto/person/personFile.dto';
import { Subject } from 'rxjs';

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
  jobs = [];

  async getActivesProgressByUserID(userID: number = 0) {
    const activeJobs = await this.fileManageQueue.getActive();
    const waitingJobs = await this.fileManageQueue.getWaiting();

    // remove element in this.jobs when not exist in activeJobs and waiting == false
    const remove = this.jobs.filter(
      (job) =>
        !activeJobs.find((j) => j.id === job.id) && job.waiting === false,
    );
    this.jobs = this.jobs.filter((job) => !remove.includes(job));

    this.logger.debug(activeJobs.filter(item => this.jobs.includes(item)));

    // this.logger.debug(elmLength);
    if (activeJobs.length > 0) {
      this.jobs = this.jobs.filter((job) =>
        activeJobs.find((j) => j.id === job.id),
      );
      activeJobs.map(async (job) => {
        const exist = this.jobs.find((j) => j.id === job.id);
        if (exist) {
          exist.waiting = false;
          if (exist.progress == (await job.progress())) {
          } else {
            exist.progress = await job.progress();
          }
        } else {
          this.jobs.push({
            id: job.id,
            progress: await job.progress(),
            waiting: false,
          });
        }
      });
    }
    if (waitingJobs.length > 0) {
      // add waiting jobs
      waitingJobs.map(async (job) => {
        const exist = this.jobs.find((j) => j.id === job.id);
        if (exist) {
          console.log('exist', await job.isWaiting());
        } else {
          this.jobs.push({
            id: job.id,
            progress: await job.progress(),
            waiting: true,
          });
        }
      });
    }
    return this.jobs;
  }
}
