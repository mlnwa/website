import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { IdUtil } from 'src/utils';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<ResultModel> {
    const result = await this.userRepository.find();
    return ResultModel.builderSuccess<UserEntity[]>().setResult(result);
  }

  async findByName(name: string): Promise<ResultModel<UserEntity>> {
    const result = await this.userRepository.findOne({
      where: { name },
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

  async create(createUserDto: CreateUserDto): Promise<ResultModel> {
    const { name } = createUserDto;
    const isFound = await this.userRepository.findOne({ where: { name } });
    if (isFound) {
      return ResultModel.builderErrorMsg('用户已存在');
    }
    await this.userRepository.save({
      ...createUserDto,
      uid: IdUtil.uuid('Axx_1xxx'),
    });
    return ResultModel.builderSuccess();
  }

  async queryPages(paginationDto: PaginationDto): Promise<PageModel<UserEntity>> {
    const result = await SelectPage.paginate<UserEntity>(this.userRepository, paginationDto);
    return ResultModel.builderSuccess<PageInfo<UserEntity>>().setResult(result);
  }
  async delete(id: number) {
    let res = await this.userRepository.delete(id);
    if (res.affected == 0) {
      return ResultModel.builderErrorMsg('用户不存在');
    }
    return ResultModel.builderSuccessMsg('删除成功');
  }
}
