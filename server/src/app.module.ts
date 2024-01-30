import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters';
import { LoggerMiddleware } from './common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { databaseConfig, authConfig, appConfig, redisConfig, emailConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModuel } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { ColumnModule } from './modules/column/column.module';
import { DBExceptionFilter } from './common/filters/db-exception.filter';
import { RedisModule } from './modules/redis/redis.module';
import { EMailModule } from './modules/email/email.module';
import { SocketModule } from './socket/socket.module';
import { RoleModule } from './modules/role/role.module';
const envFilePath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, appConfig, redisConfig, emailConfig],
      envFilePath: [envFilePath],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModuel,
    BlogModule,
    CategoryModule,
    TagModule,
    ColumnModule,
    RedisModule,
    EMailModule,
    SocketModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DBExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(LoggerMiddleware).forRoutes('*');
  }
}
