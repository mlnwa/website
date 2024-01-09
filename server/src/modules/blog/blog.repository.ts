import { DataSource, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { QueryPagesBlogDto } from './dto/query-blog.dto';
import { Injectable } from '@nestjs/common';
import { BlogDetailVo, BlogPageVo } from './vo/blog-page.vo';
import { BaseRepository } from 'src/base/base.repository';

@Injectable()
export class BlogRepository extends BaseRepository<BlogEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, BlogEntity);
  }
  // 查询博客列表
  async findBlogList(queryPagesBlogDto: QueryPagesBlogDto) {
    const { pageSize, pageIndex, ...others } = queryPagesBlogDto;
    const queryBuilder = this.createQueryBuilder('blog');
    queryBuilder
      .select([
        'blog.id as id',
        'blog.title as title',
        'blog.createAt as createAt',
        'blog.updateAt as updateAt',
        'blog.viewCount as viewCount',
        'user.id as userId',
        'user.name as userName',
        'category.id as categoryId',
        'category.name as categoryName',
      ])
      .addSelect('CASE WHEN COUNT(tags.id) > 0 THEN JSON_ARRAYAGG(tags.id)ELSE JSON_ARRAY() END', 'tagIds')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.column', 'column')
      .where(others)
      .orderBy('blog.createAt', 'DESC')
      .groupBy('blog.id');
    return await this.loadQueryBuilderToPages<BlogPageVo>(queryBuilder, pageIndex, pageSize);
  }

  async findBlogDetailById(id: number) {
    const queryBuilder = this.createQueryBuilder('blog');
    queryBuilder
      .select([
        'blog.id as id',
        'blog.title as title',
        'blog.content as content',
        'blog.createAt as createAt',
        'blog.updateAt as updateAt',
        'blog.status as status',
        'blog.fromStatus as fromStatus',
        'blog.viewCount as viewCount',
        'blog.imgUrl as imgUrl',
        'blog.abstract as abstract',
        'blog.enableComment as enableComment',
        'blog.enablePraise as enablePraise',
        'blog.enableCopyright as enableCopyright',
        'blog.enableRecommend as enableRecommend',
        'user.id as userId',
        'user.name as userName',
        'category.id as categoryId',
        'category.name as categoryName',
        'column.id as columnId',
        'column.name as columnName',
      ])
      .addSelect('CASE WHEN COUNT(tags.id) > 0 THEN JSON_ARRAYAGG(tags.id)ELSE JSON_ARRAY() END', 'tagIds')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .leftJoin('blog.column', 'column')
      .leftJoin('blog.tags', 'tags')
      .where('blog.id = :id', { id });
    const result = await queryBuilder.getRawOne<BlogDetailVo>();
    result.enableComment = Boolean(result.enableComment);
    result.enablePraise = Boolean(result.enablePraise);
    result.enableCopyright = Boolean(result.enableCopyright);
    result.enableRecommend = Boolean(result.enableRecommend);
    return result;
  }
}
