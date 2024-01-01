import { DataSource, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { QueryPagesBlogDto } from './dto/query-blog.dto';
import { Injectable } from '@nestjs/common';
import { BlogDetailVo, BlogPageVo } from './vo/blog-page.vo';

@Injectable()
export class BlogRepository extends Repository<BlogEntity> {
  constructor(dataSource: DataSource) {
    super(BlogEntity, dataSource.createEntityManager());
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
        'user.id as userId',
        'user.name as userName',
        'category.id as categoryId',
        'category.name as categoryName',
      ])
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.column', 'column')
      .where(others)
      .orderBy('blog.createAt', 'DESC');
    const count = await queryBuilder.getCount();
    const skip = pageSize * (pageIndex - 1);
    let result: BlogPageVo[] = [];
    if (skip < count) {
      result = await queryBuilder.skip(skip).take(pageSize).getRawMany();
    }
    return { list: result, total: count };
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
        'user.id as userId',
        'user.name as userName',
        'category.id as categoryId',
        'category.name as categoryName',
        'column.id as columnId',
        'column.name as columnName',
      ])
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .leftJoin('blog.column', 'column')
      .where('blog.id = :id', { id });
    const result = await queryBuilder.getRawOne<BlogDetailVo>();
    return result;
  }
}