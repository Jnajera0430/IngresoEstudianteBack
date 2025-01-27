import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',      
    },

  })
  export class EventsSocket {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any) {
      return 'ok';
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }
  }