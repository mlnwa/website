import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { RoleEntity } from './role.entity';
import { DataSource } from 'typeorm';
import { QueryPagesRoleDto } from './dto/query-role.dto';
import { RoleVo } from './vo/role.vo';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, RoleEntity);
  }
  async findList(queryPagesRoleDto: QueryPagesRoleDto) {
    const { pageSize, pageIndex, ...others } = queryPagesRoleDto;
    const queryBuilder = this.createQueryBuilder('role');
    queryBuilder
      .select([
        'role.id as id',
        'role.name as name',
        'role.description as description',
        'role.createAt as createAt',
        'role.updateAt as updateAt',
      ])
      .addSelect('CONVERT(COUNT(users.id), DOUBLE)', 'number')
      .leftJoin('role.users', 'users')
      .where(others)
      .orderBy('role.createAt', 'DESC')
      .groupBy('role.id');
    return await this.loadQueryBuilderToPages<RoleVo>(queryBuilder, pageIndex, pageSize);
  }
}
