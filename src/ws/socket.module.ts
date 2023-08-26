import { Module } from '@nestjs/common';
import { EventsSocket } from './eventsSocket';


@Module({
  providers: [EventsSocket],
})
export class SocketModule {}