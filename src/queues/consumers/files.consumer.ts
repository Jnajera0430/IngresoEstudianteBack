import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { FILE_ONE_UPLOAD_WORKER, FILE_UPLOAD_QUEUE } from 'src/constants/queues';
import { DataOfFileExcel } from 'src/dto/person/personFile.dto';
import { PersonTypeEnum } from 'src/dto/person/personType.dto';
import { dateFormaterExcel } from 'src/middlewares/excel/dateFormat';
import { CareerService } from 'src/services/career.service';
import { GroupService } from 'src/services/group.service';
import { PersonService } from 'src/services/person.service';
import { UserService } from 'src/services/user.service';

@Processor(FILE_UPLOAD_QUEUE)
export class FilesConsumer {
  constructor(
    private readonly personService: PersonService,
    private readonly careerService: CareerService,
    private readonly GroupService: GroupService
  ) { }

  private readonly logger = new Logger(FilesConsumer.name);

  @Process(FILE_ONE_UPLOAD_WORKER)
  async processFile(job: Job<DataOfFileExcel>, done: DoneCallback) {
    try {
      const people = job.data.listPeopleFile;
      const infoOfProgram = job.data.infoOfProgram
      let [careerFound, groupFound, personType] = await Promise.all([
        this.careerService.findByName(infoOfProgram.career),
        this.GroupService.listGroupByCode(infoOfProgram.codigo),
        this.personService.getPersonTypeByType(PersonTypeEnum.APRENDIZ)
      ]);
      if (!careerFound) {
        careerFound = await this.careerService.createCareer(infoOfProgram.career);
      }
      if (!groupFound) {
        groupFound = await this.GroupService.createGroup({
          code: infoOfProgram.codigo,
          dateStart: dateFormaterExcel(infoOfProgram.fechaInicio),
          dateEnd: dateFormaterExcel(infoOfProgram.fechaFin),
          career: careerFound
        });
      }
      job.progress(0);
      let progressCount = 0;
      for (let person of people) {
        const progress = (progressCount++) / people.length;
        job.progress(progress * 100);
        const personFound = await this.personService.getPersonByDocument(person.document);
        if (!personFound) {
          personFound.groups.push(groupFound);
          personFound.personTypes = personType;
          this.personService.createPersonAprendiz(person);
        }
      }
      job.progress(100);
      done(null, job.data);
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
