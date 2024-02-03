import { Module, OnModuleInit } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './permission.entity';
import { PermissionMeta } from './permission.meta';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionRepository, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule implements OnModuleInit {
  constructor(private readonly permissionService: PermissionService) {}
  async onModuleInit() {
    this.initPermission();
  }
  private async initPermission() {
    this.permissionService.init(PermissionMeta.getPermissionMetas());
  }
}
