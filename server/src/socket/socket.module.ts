import { Module } from '@nestjs/common';
import { AuthGateway } from './gateways/auth.gateway';
import { ChatGateway } from './gateways/chat.gateway';
import { NotificationGateway } from './gateways/notification.gatway';

@Module({
  providers: [AuthGateway, ChatGateway, NotificationGateway],
})
export class SocketModule {}
