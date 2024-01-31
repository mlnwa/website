import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPagesPermissionDto } from './dto/query-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('list')
  getPermissionList(@Query() queryPagesPermissionDto: QueryPagesPermissionDto) {
    return this.permissionService.queryPages(queryPagesPermissionDto);
  }

  @Put(':id')
  updatePermission(@Param('id') id: number, @Body() updatePermisionDto: Partial<CreatePermissionDto>) {
    return this.permissionService.update(id, updatePermisionDto);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.permissionService.deleteById(id);
  }
}
