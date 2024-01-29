import { BaseRepository } from 'src/base/base.repository';
import { UserEntity } from './user.entity';
import { DataSource } from 'typeorm';
import { QueryPagesUserDto } from './dto/query-user.dot';
import { UserVo } from './vo/user.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSouce: DataSource) {
    super(dataSouce, UserEntity);
  }
  async findList(queryPagesUserDto: QueryPagesUserDto) {
    const { pageIndex, pageSize, ...others } = queryPagesUserDto;
    const queryBuilder = this.createQueryBuilder('user');
    queryBuilder
      .select([
        'user.id as id',
        'user.uid as uid',
        'user.name as name',
        'user.email as email',
        'user.status as status',
        'user.createAt as createAt',
        'user.updateAt as updateAt',
      ])
      .addSelect('CONVERT(COUNT(blogs.id), DOUBLE)', 'number')
      .leftJoin('user.blogs', 'blogs')
      .where(others)
      .orderBy('user.createAt', 'DESC')
      .groupBy('user.id');
    return await this.loadQueryBuilderToPages<UserVo>(queryBuilder, pageIndex, pageSize);
  }
}
