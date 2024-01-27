import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private readonly server: Server;
  constructor() {}

  @SubscribeMessage('joinRoom')
  handleMessage(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    const { roomId } = data;
    if (client.rooms.has(roomId)) return 'already joined';
    client.join(roomId);
    this.server.to(roomId).emit('message', `${client.id} joined the room ${roomId}`);
  }
  @SubscribeMessage('sendMessageToRoom')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string; message: string }) {
    const { roomId, message } = data;
    this.server.to(roomId).emit('message', ` ${client.id} send ${message} to ${roomId}`);
  }
}
