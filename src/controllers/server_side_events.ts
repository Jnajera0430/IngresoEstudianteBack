import { switchMap, Observable, interval, map,  } from 'rxjs/fetch';
import { Controller, MessageEvent, Post, Req, Sse, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { QueuesService } from "src/queues/queues.service";
import { UserService } from "src/services/user.service";

@Controller('events')
export class SSEController {

    constructor(
        private readonly queueService: QueuesService,
        private readonly userService: UserService
    ) {}

    @Sse('sse')
    sse(): Observable<MessageEvent> {
      return interval(500).pipe(
        switchMap(() => this.queueService.getActivesProgressByUserID()),
        map((p:any) => ({ data: p })),
      );
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async postUploadFileUser(
      @Req() req: Request,
      @UploadedFile() file: Express.Multer.File,
    ) {
      try {
        return await this.userService.readFile(file);
      } catch (error) {
        return error;
      }
    }
}