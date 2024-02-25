import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { PermissionService } from '../permission/permission.service';
import { PermissionModule } from '../permission/permisssion.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
