import { switchMap, Observable, interval, map, } from 'rxjs';
import { BadRequestException, Controller, MessageEvent, Post, Req, Sse, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { QueuesService } from "src/queues/queues.service";
import { UserService } from "src/services/user.service";
import { JwtService } from '@nestjs/jwt';

@Controller('events')
export class SSEController {

  constructor(
    private readonly queueService: QueuesService,
    private readonly userService: UserService,
    private readonly jwtServices: JwtService,
  ) { }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(500).pipe(
      switchMap(() => this.queueService.getActivesProgressByUserID()),
      map((p: any) => ({ data: p })),
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async postUploadFileUser(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const typesRequired = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
    if (!typesRequired.includes(file.mimetype))
      throw new BadRequestException({ message: "Files is not allowed. Only is allowed excel type file.", typesRequired })

      // get claims from token
      const token = req.headers.authorization.split(' ')[1] || ''
      const decoded: any = this.jwtServices.verify(token);
    console.log('decoded', decoded.user.id);

    return await this.userService.readFile(file, decoded.user.id);

  }
}