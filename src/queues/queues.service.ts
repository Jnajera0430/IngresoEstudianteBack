import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
import { MyQueueProcesosr } from './consumers/MyQueues.worker';
@Injectable()
export class QueuesService {
    constructor(
        @InjectQueue('myQueue') private readonly myQueue: Queue,
        private readonly myQueueWorker:MyQueueProcesosr
    ){}
    /**
     * Worker 
     */
    //private readonly myQueueWorker:MyQueueProcesosr
    async addTask(){
        this.myQueue.process((job:Job,done:DoneCallback)=>this.myQueueWorker.processMyJob(job,done));
    }
    
}
