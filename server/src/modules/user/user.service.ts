import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { Injectable } from '@nestjs/common';

export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<ResultModel> {
    const result = await this.userRepository.find({
      // relations:['blogs']
    });
    return ResultModel.builderSuccess().setResult(result);
  }
  async findByUserName(name: string): Promise<ResultModel> {
    const result = await this.userRepository.findOne({
      where: { name },
    });
    return ResultModel.builderSuccess().setResult(result);
  }

  async create(user): Promise<ResultModel> {
    const { name } = user;
    const isFound = await this.userRepository.findOne({
      where: { name },
    });
    if (isFound) {
      return ResultModel.builderErrorMsg('用户已存在');
    }
    await this.userRepository.save(user);
    return ResultModel.builderSuccess();
  }
}
