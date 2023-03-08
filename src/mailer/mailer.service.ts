import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const nodemailer = require('nodemailer');

interface IAttachment {
  filename: string;
  content: string | Buffer | any;
  contentType: string;
}
interface ISendEmail {
  to?: string;
  subject?: string;
  text?: string;
  attachments?: IAttachment[];
}

@Injectable()
export class MailerService {
  transporter: any;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAILER_HOST'),
      port: configService.get('MAILER_PORT'),
      auth: {
        user: configService.get('MAILER_USER'),
        pass: configService.get('MAILER_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    attachments,
  }: ISendEmail): Promise<void> {
    this.transporter?.sendMail({
      to: to,
      subject,
      text,
      attachments,
      from: this.configService.get('MAILER_USER'),
    });
  }
}
