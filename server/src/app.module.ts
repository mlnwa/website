import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters';
import { LoggerMiddleware } from './common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[databaseConfig],
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useFactory:(config:ConfigService) => config.get('database'),
      inject:[ConfigService]
    }),
    UserModule
  ],
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
