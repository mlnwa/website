import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { PermissionEntity } from './permission.entity';
import { DataSource, Like } from 'typeorm';
import { QueryPagesPermissionDto } from './dto/query-permission.dto';
import { PermissionVo } from './vo/permission.vo';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PermissionEntity);
  }
  async findList(queryPagesPermissionDto: QueryPagesPermissionDto) {
    const { pageIndex, pageSize, ...others } = queryPagesPermissionDto;
    ['name', 'description'].forEach((item) => {
      if (!Reflect.has(others, item)) return;
      others[item] = Like(`%${others[item]}%`);
    });
    const queryBuilder = this.createQueryBuilder('permission');
    queryBuilder
      .select([
        'permission.id as id',
        'permission.name as name',
        'permission.description as description',
        'permission.enable as enable',
        'permission.createAt as createAt',
        'permission.updateAt as updateAt',
      ])
      .where(others)
      .orderBy('permission.createAt', 'DESC');

    const { list, total } = await this.loadQueryBuilderToPages<PermissionVo>(queryBuilder, pageIndex, pageSize);
    list.forEach((item) => {
      item.enable = Boolean(item.enable);
    });
    return { list, total };
  }
}
