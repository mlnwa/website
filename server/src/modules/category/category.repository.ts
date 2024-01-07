import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { DataSource } from 'typeorm';
import { QueryPagesCategoryDto } from './dto/query-category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryVo } from './vo/category.vo';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, CategoryEntity);
  }
  async findList(queryPagesTagDto: QueryPagesCategoryDto) {
    const { pageSize, pageIndex, ...others } = queryPagesTagDto;
    const queryBuilder = this.createQueryBuilder('category');
    queryBuilder
      .select([
        'category.id as id',
        'category.name as name',
        'category.createAt as createAt',
        'category.updateAt as updateAt',
        'category.description as description',
      ])
      .addSelect('CONVERT(COUNT(blogs.id), DOUBLE)', 'number')
      .leftJoin('category.blogs', 'blogs')
      .where(others)
      .orderBy('CONVERT(COUNT(blogs.id), DOUBLE)', 'DESC')
      .groupBy('category.id');
    return await this.loadQueryBuilderToPages<CategoryVo>(queryBuilder, pageIndex, pageSize);
  }
}
