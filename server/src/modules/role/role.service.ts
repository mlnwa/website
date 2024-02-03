import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './role.repository';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesRoleDto } from './dto/query-role.dto';
import { RoleVo } from './vo/role.vo';
import { PageInfo } from 'src/lib/panination';
import { RoleEntity } from './role.entity';
import { In } from 'typeorm';
import { TypeUtil } from 'src/utils';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository, private readonly permissionService: PermissionService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds, ...partialRole } = createRoleDto;
    const validateModel = await this.validateCreateMeta(partialRole);
    if (!validateModel.getSuccess()) return validateModel;
    const role = new RoleEntity();
    const supRoleModel = await this.supRoleWithMeta(role, createRoleDto);
    if (!supRoleModel.getSuccess()) return supRoleModel;
    await this.roleRepository.save(createRoleDto);
    return ResultModel.builderSuccessMsg('创建成功');
  }

  async queryPages(queryPagesRoleDto: QueryPagesRoleDto) {
    const { pageIndex, pageSize } = queryPagesRoleDto;
    const pageInfo = new PageInfo<RoleVo>({
      ...(await this.roleRepository.findList(queryPagesRoleDto)),
      pageIndex,
      pageSize,
    });
    return ResultModel.builderSuccess().setResult(pageInfo);
  }

  async findById(id: number) {
    const res = await this.roleRepository.findOne({ where: { id } });
    if (res == null) return ResultModel.builderErrorMsg('角色不存在');
    return ResultModel.builderSuccess().setResult(res);
  }

  async findByName(name: string) {
    const res = await this.roleRepository.findOne({ where: { name } });
    if (res == null) return ResultModel.builderErrorMsg('角色不存在');
    return ResultModel.builderSuccess().setResult(res);
  }

  async deleteById(id: number) {
    const res = await this.roleRepository.delete({ id });
    if (res.affected == 0) return ResultModel.builderErrorMsg('角色不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, updateRoleDto: Partial<CreateRoleDto>) {
    const roleModel = await this.findById(id);
    if (!roleModel.getSuccess()) return roleModel;
    const { permissionIds, ...partialRole } = updateRoleDto;
    const validateModel = await this.validateCreateMeta(partialRole);
    if (!validateModel.getSuccess()) return validateModel;
    const supRoleModel = await this.supRoleWithMeta(roleModel.getResult(), updateRoleDto);
    if (!supRoleModel.getSuccess()) return supRoleModel;
    await this.roleRepository.save(supRoleModel.getResult());
    return ResultModel.builderSuccessMsg('更新成功');
  }

  async findByIds(ids: number[]): Promise<ResultModel<RoleEntity[]>> {
    const res = await this.roleRepository.findBy({ id: In(ids) });
    if (res.length == 0) return ResultModel.builderErrorMsg('角色不存在');
    return ResultModel.builderSuccess<RoleEntity[]>().setResult(res);
  }

  private async supRoleWithMeta(role: RoleEntity, updateRoleDto: Partial<CreateRoleDto>) {
    const { permissionIds, ...partialRole } = updateRoleDto;
    if (TypeUtil.isArray(permissionIds)) {
      if (permissionIds.length === 0) {
        role.permissions = [];
      } else {
        const permissionsModel = await this.permissionService.findByIds(permissionIds);
        if (!permissionsModel.getSuccess()) return permissionsModel;
        role.permissions = permissionsModel.getResult();
      }
    }
    Object.assign(role, partialRole);
    return ResultModel.builderSuccess().setResult(role);
  }

  private async validateCreateMeta(partialRole: Partial<RoleEntity>) {
    const { name } = partialRole;
    let isFound = null;
    if (name) {
      isFound = await this.roleRepository.findOneBy({ name });
    }
    if (isFound) {
      return ResultModel.builderErrorMsg('角色名称已存在');
    }

    return ResultModel.builderSuccess();
  }
}
