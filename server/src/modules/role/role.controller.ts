import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryPagesRoleDto } from './dto/query-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('list')
  async getRoleList(@Query() queryPagesRoleDto: QueryPagesRoleDto) {
    return this.roleService.queryPages(queryPagesRoleDto);
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: Partial<CreateRoleDto>) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteById(id);
  }
}
