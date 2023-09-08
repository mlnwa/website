import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

const listenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * http-exception global filter
   */
  // app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(listenPort);
}
bootstrap();
