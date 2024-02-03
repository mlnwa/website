import { UserEntity } from './user.entity';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { PageInfo } from 'src/lib/panination';
import { IdUtil, TypeUtil } from 'src/utils';
import { UserRepository } from './user.repository';
import { QueryPagesUserDto } from './dto/query-user.dot';
import { UserVo } from './vo/user.vo';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly roleService: RoleService) {}

  async findByName(name: string): Promise<ResultModel<UserEntity>> {
    const result = await this.userRepository.findOne({
      where: { name },
    });
    if (result == null) {
      return ResultModel.builderErrorMsg('用户不存在');
    }
    return ResultModel.builderSuccess<UserEntity>().setResult(result);
  }

  async findByEmail(email: string): Promise<ResultModel<UserEntity>> {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    if (result == null) {
      return ResultModel.builderErrorMsg('用户不存在');
    }
    return ResultModel.builderSuccess<UserEntity>().setResult(result);
  }

  async findById(id: number): Promise<ResultModel<UserEntity>> {
    const result = await this.userRepository.findOne({ where: { id } });
    if (result == null) {
      return ResultModel.builderErrorMsg('用户不存在');
    }
    return ResultModel.builderSuccess<UserEntity>().setResult(result);
  }

  async create(partialUserData: Partial<UserEntity>): Promise<ResultModel> {
    const validateModel = await this.validateCreateMeta(partialUserData);
    if (validateModel.getSuccess() === false) return validateModel;
    const user = new UserEntity();
    user.uid = IdUtil.uuid('Axx_1xxx');
    Object.assign(user, partialUserData);
    await this.userRepository.save(user);
    return ResultModel.builderSuccess();
  }

  private async validateCreateMeta(partialUserData: Partial<UserEntity>) {
    const { name, email } = partialUserData;
    let isFound = null;
    if (name) {
      isFound = await this.userRepository.findOne({ where: { name } });
    }
    if (isFound) {
      return ResultModel.builderErrorMsg('用户名重复');
    }
    if (email) {
      isFound = await this.userRepository.findOne({ where: { email } });
    }
    if (isFound) {
      return ResultModel.builderErrorMsg(`邮箱${email}已被绑定`);
    }
    return ResultModel.builderSuccess();
  }

  async queryPages(queryPagesUserDto: QueryPagesUserDto): Promise<PageModel<UserVo>> {
    const { pageIndex, pageSize } = queryPagesUserDto;
    const pageInfo = new PageInfo<UserVo>({
      ...(await this.userRepository.findList(queryPagesUserDto)),
      pageIndex,
      pageSize,
    });
    return ResultModel.builderSuccess<PageInfo<UserVo>>().setResult(pageInfo);
  }

  async delete(id: number) {
    let res = await this.userRepository.delete(id);
    if (res.affected == 0) {
      return ResultModel.builderErrorMsg('用户不存在');
    }
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, updateUserDto: Omit<UpdateUserDto, 'emailCode'>) {
    const userModel = await this.findById(id);
    if (!userModel.getSuccess()) return ResultModel.builderErrorMsg('用户不存在');
    const { roleIds, ...partialUser } = updateUserDto;
    const validateModel = await this.validateCreateMeta(partialUser);
    if (!validateModel.getSuccess()) return validateModel;
    const supUserModel = await this.supUserWithMeta(userModel.getResult(), updateUserDto);
    if (!supUserModel.getSuccess()) return supUserModel;
    await this.userRepository.save(userModel.getResult());
    return ResultModel.builderSuccessMsg('更新成功');
  }

  private async supUserWithMeta(user: UserEntity, updateUserDto: Omit<UpdateUserDto, 'emailCode'>) {
    const { roleIds, ...partialUser } = updateUserDto;
    if (TypeUtil.isArray(roleIds)) {
      if (roleIds.length === 0) {
        user.roles = [];
      } else {
        let rolesModel = await this.roleService.findByIds(roleIds);
        if (!rolesModel.getSuccess()) return rolesModel;
        user.roles = rolesModel.getResult();
      }
    }
    Object.assign(user, partialUser);
    return ResultModel.builderSuccess().setResult(user);
  }
}
