import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  password: process.env.EMAIL_PASSWORD,
  user: process.env.EMAIL_USER,
}));
