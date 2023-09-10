import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos';
import { SelectPage } from 'src/lib/panination';

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

  async create(createUserDto: CreateUserDto): Promise<ResultModel> {
    const { name } = createUserDto;
    const isFound = await this.userRepository.findOne({ where: { name } });
    if (isFound) {
      return ResultModel.builderErrorMsg('用户已存在');
    }
    await this.userRepository.save(createUserDto);
    return ResultModel.builderSuccess();
  }

  async findByPagination(paginationDto: PaginationDto) {
    const result = await SelectPage.paginate<UserEntity>(this.userRepository, paginationDto);
    return ResultModel.builderSuccess().setResult(result);
  }
}
