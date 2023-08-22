import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { FILE_UPLOAD_QUEUE } from 'src/constants/queues';
import { PersonService } from 'src/services/person.service';
import { UserService } from 'src/services/user.service';

@Processor(FILE_UPLOAD_QUEUE)
export class FilesConsumer {
  constructor(private readonly personService: PersonService) {}

  private readonly logger = new Logger(FilesConsumer.name);

  @Process()
  async processFile(job: Job<PersonFile>, done: DoneCallback) {
    try {
      const people = job.data.listPersonFile;
      people.map((x: any) => {
        this.personService.getPersonByDocument(x.document).then((exist) => {
          if (!exist) {
            this.personService.createPerson(x);
          }
        });
      });
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
