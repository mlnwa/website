import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { ResultModel } from 'src/common/result/ResultModel';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionEntity } from './permission.entity';
import { QueryPagesPermissionDto } from './dto/query-permission.dto';
import { PageInfo } from 'src/lib/panination';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const validateModel = await this.validateCreateMeta(createPermissionDto);
    if (!validateModel.getSuccess()) return validateModel;
    await this.permissionRepository.save(createPermissionDto);
    return ResultModel.builderSuccessMsg('创建成功');
  }

  private async validateCreateMeta(partialPermission: Partial<PermissionEntity>) {
    const { name, description } = partialPermission;
    let isFound = null;
    if (name) isFound = await this.permissionRepository.findOne({ where: { name } });
    if (description && isFound == null) isFound = await this.permissionRepository.findOne({ where: { description } });
    if (isFound != null) return ResultModel.builderErrorMsg('权限已存在');
    return ResultModel.builderSuccess();
  }

  async queryPages(queryPagesPermissionDto: QueryPagesPermissionDto) {
    const { pageIndex, pageSize } = queryPagesPermissionDto;
    const pageInfo = new PageInfo({
      ...(await this.permissionRepository.findList(queryPagesPermissionDto)),
      pageIndex,
      pageSize,
    });
    return ResultModel.builderSuccess().setResult(pageInfo);
  }

  async findById(id: number): Promise<ResultModel<PermissionEntity>> {
    const res = await this.permissionRepository.findOne({ where: { id } });
    if (res == null) return ResultModel.builderErrorMsg('权限不存在');
    return ResultModel.builderSuccess().setResult(res);
  }

  async findByName(name: string): Promise<ResultModel<PermissionEntity>> {
    const res = await this.permissionRepository.findOne({ where: { name } });
    if (res == null) return ResultModel.builderErrorMsg('权限不存在');
    return ResultModel.builderSuccess().setResult(res);
  }

  async update(id: number, partialPermission: Partial<PermissionEntity>) {
    const permissionModel = await this.findById(id);
    if (!permissionModel.getSuccess()) return permissionModel;
    const permission = Object.assign(permissionModel.getResult(), partialPermission);
    await this.permissionRepository.save(permission);
  }

  async deleteById(id: number) {
    const res = await this.permissionRepository.delete(id);
    if (res.affected === 0) return ResultModel.builderErrorMsg('权限不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }
}
