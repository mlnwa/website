import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './role.repository';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesRoleDto } from './dto/query-role.dto';
import { RoleVo } from './vo/role.vo';
import { PageInfo } from 'src/lib/panination';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleModel = await this.findByName(createRoleDto.name);
    if (roleModel.getSuccess()) return ResultModel.builderErrorMsg('角色已存在');
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
    await this.roleRepository.update(id, updateRoleDto);
    return ResultModel.builderSuccessMsg('更新成功');
  }
}
