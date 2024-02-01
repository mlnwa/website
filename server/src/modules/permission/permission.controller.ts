import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryPagesPermissionDto } from './dto/query-permission.dto';
import { PermissionService } from './permission.service';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionMeta } from './permission.meta';

@Controller('permission')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // @Post()
  // createPermission(@Body() createPermissionDto: CreatePermissionDto) {
  //   return this.permissionService.create(createPermissionDto);
  // }

  @Get('list')
  getPermissionList(@Query() queryPagesPermissionDto: QueryPagesPermissionDto) {
    return this.permissionService.queryPages(queryPagesPermissionDto);
  }

  @Put(':id')
  updatePermission(@Param('id') id: number, @Body() updatePermisionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, updatePermisionDto);
  }

  @Post(':id/reset')
  resetPermission(@Param('id') id: number) {
    return this.permissionService.reset(id);
  }

  @Post('reset')
  async resetAllPermission() {
    return this.permissionService.resetAll(PermissionMeta.getPermissionMetas());
  }

  // @Delete(':id')
  // deletePermission(@Param('id') id: number) {
  //   return this.permissionService.deleteById(id);
  // }
}
