import {Process, Processor} from '@nestjs/bull';
import {Job,DoneCallback} from 'bull'
@Processor("myQueue")
export class MyQueueProcesosr{
    @Process('myJob')
    async processMyJob(job:Job,done: DoneCallback){
        try {
            done(null,job.data);
            console.log('Procesando el trabajo', job.data);  
            return 'Trabajo en cola'
        } catch (error) {
            done(error)
        }
    }
}