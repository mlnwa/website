import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { PaginationDto } from 'src/common/dtos';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { IdUtil } from 'src/utils';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { QueryPagesUserDto } from './dto/query-user.dot';
import { UserVo } from './vo/user.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const { password, ...userProps } = partialUserData;
    const validateModel = await this.validateCreateMeta(partialUserData);
    if (validateModel.getSuccess() === false) return validateModel;
    const user = new UserEntity();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(partialUserData.password, salt);
    user.uid = IdUtil.uuid('Axx_1xxx');
    Object.assign(user, userProps);
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
}
