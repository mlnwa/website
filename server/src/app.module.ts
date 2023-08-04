import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * http-exception local filter
     */
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(LoggerMiddleware).forRoutes('*');
  }
}
