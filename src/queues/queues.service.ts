import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class QueuesService {
    constructor(
        @InjectQueue('myQueue') private readonly myQueue: Queue,
    ){}

    
}
