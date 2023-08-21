import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('file')
export class FileProcessor{
    @Process("addFile")
    addFile(job: Job){
        const {data} = job;
        console.log("llegó: ", data);
        return job;
    }
}