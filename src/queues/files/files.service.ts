import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';
@Injectable()
export class FileService {
    constructor(
        @InjectQueue('files') private readonly fileQueue: Queue,
    ) { }

    async addFile() {
        return await this.fileQueue.add('addFile', {
            file: 'audio.mp3'
        }, { lifo: true });
    }
}