import { registerAs } from '@nestjs/config';
export const databaseConfig = registerAs('database', () => ({
  type: 'mysql',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  dateStrings: true,
}));
