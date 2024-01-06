import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { ColumnEntity } from './column.entity';
import { DataSource } from 'typeorm';
import { QueryPagesColumnDto } from './dto/query-column.dto';
import { ColumnVo } from './vo/column.vo';

@Injectable()
export class ColumnRepository extends BaseRepository<ColumnEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, ColumnEntity);
  }
  async findList(queryPagesTagDto: QueryPagesColumnDto) {
    const { pageSize, pageIndex, ...others } = queryPagesTagDto;
    const queryBuilder = this.createQueryBuilder('column');
    queryBuilder
      .select([
        'column.id as id',
        'column.name as name',
        'column.createAt as createAt',
        'column.updateAt as updateAt',
        'column.description as description',
      ])
      .addSelect('CONVERT(COUNT(blogs.id), DOUBLE)', 'number')
      .leftJoin('column.blogs', 'blogs')
      .where(others)
      .orderBy('column.createAt', 'DESC')
      .groupBy('column.id');
    return await this.loadQueryBuilderToPages<ColumnVo>(queryBuilder, pageIndex, pageSize);
  }
}
