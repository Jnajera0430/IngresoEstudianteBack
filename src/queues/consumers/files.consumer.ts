import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { FILE_ONE_UPLOAD_WORKER, FILE_UPLOAD_QUEUE } from 'src/constants/queues';
import { DataOfFileExcel } from 'src/dto/person/personFile.dto';
import { CareerService } from 'src/services/career.service';
import { GroupService } from 'src/services/group.service';
import { PersonService } from 'src/services/person.service';
import { UserService } from 'src/services/user.service';

@Processor(FILE_UPLOAD_QUEUE)
export class FilesConsumer {
  constructor(
    private readonly personService: PersonService,
    private readonly careerService:CareerService,
    private readonly GroupService: GroupService
    ) { }

  private readonly logger = new Logger(FilesConsumer.name);

  @Process(FILE_ONE_UPLOAD_WORKER)
  async processFile(job: Job<DataOfFileExcel>, done: DoneCallback) {
    try {
      const people = job.data.listPeopleFile;
      const infoOfProgram = job.data.infoOfProgram
      const careerFound = await this.careerService.findByName(infoOfProgram.career)
      for (let person of people) {
        const personFound = await this.personService.getPersonByDocument(person.document);
        if (!personFound) {
          this.personService.createPersonAprendiz(person);
        }
      }
      // console.log('person', people[0]);
      // done(null,job.data);
      // return 'Trabajo en cola'
    } catch (error) {
      done(error);
    }
  }
}

interface PersonFile {
  infoOfProgram: any;
  listPersonFile: any[];
}
