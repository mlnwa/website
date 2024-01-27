import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AuthGateway {
  constructor() {}
}
