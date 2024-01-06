import { BaseRepository } from 'src/base/base.repository';
import { TagEntity } from './tag.entity';
import { DataSource } from 'typeorm';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { TagVo } from './vo/tag.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends BaseRepository<TagEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, TagEntity);
  }
  async findList(queryPagesTagDto: QueryPagesTagDto) {
    const { pageSize, pageIndex, ...others } = queryPagesTagDto;
    const queryBuilder = this.createQueryBuilder('tag');
    queryBuilder
      .select([
        'tag.id as id',
        'tag.name as name',
        'tag.createAt as createAt',
        'tag.updateAt as updateAt',
        'tag.description as description',
      ])
      .addSelect('CONVERT(COUNT(blogs.id), DOUBLE)', 'number')
      .leftJoin('tag.blogs', 'blogs')
      .where(others)
      .orderBy('tag.createAt', 'DESC')
      .groupBy('tag.id');
    return await this.loadQueryBuilderToPages<TagVo>(queryBuilder, pageIndex, pageSize);
  }
}
