import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RedisService } from '../redis/redis.service';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, RedisService, UserRepository, RoleService],
  exports: [UserService],
})
export class UserModule {}
