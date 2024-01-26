import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

interface MailInfo {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class EMailService {
  private transporter: Transporter;
  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get('email');
    this.transporter = createTransport({
      port: emailConfig.port,
      host: emailConfig.host,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
      secure: true,
    });
  }
  async sendEmail(mailInfo: MailInfo) {
    const info = await this.transporter.sendMail({
      from: this.configService.get('email.user'),
      ...mailInfo,
    });
    return info;
  }
}
