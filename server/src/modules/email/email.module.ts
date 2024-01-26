import { Module } from '@nestjs/common';
import { EMailService } from './email.service';

@Module({
  providers: [EMailService],
  exports: [EMailService],
})
export class EMailModule {}
