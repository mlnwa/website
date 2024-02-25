import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RedisService } from '../redis/redis.service';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permisssion.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, PermissionModule, RedisModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
