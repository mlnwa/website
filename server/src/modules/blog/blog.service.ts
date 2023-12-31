import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { BlogStatus } from './blog.enum';
import { QueryPagesBlogDto } from './dto/query-blog.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async create(blog: Partial<BlogEntity>): Promise<ResultModel> {
    await this.blogRepository.save(blog);
    return ResultModel.builderSuccessMsg('保存成功');
  }

  async findPages(queryPagesBlogDto: QueryPagesBlogDto) {
    const { pageIndex, pageSize } = queryPagesBlogDto;
    const resultModel = new ResultModel<PageInfo<BlogEntity>>();
    const pageInfo = new PageInfo<BlogEntity>({
      ...(await this.blogRepository.findBlogList(queryPagesBlogDto)),
      pageIndex,
      pageSize,
    });
    resultModel.setSuccess(true);
    resultModel.setResult(pageInfo);
    return resultModel;
  }

  async findById(id: number) {
    const res = await this.blogRepository.findOneBy({ id });
    if (!res) return ResultModel.builderErrorMsg('博客不存在');
    return ResultModel.builderSuccess<BlogEntity>().setResult(res);
  }

  async findDetailById(id: number) {}

  async deleteById(id: number) {
    let res = await this.blogRepository.delete({ id });
    if (res.affected == 0) return ResultModel.builderErrorMsg('博客不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(draft: Partial<BlogEntity>) {
    const queryBlog = await this.findById(draft.id);
    if (queryBlog == null) {
      return ResultModel.builderErrorMsg('博客不存在');
    }
    await this.blogRepository.update({ id: draft.id }, draft);
    return ResultModel.builderSuccessMsg('更新成功');
  }

  async publish(id: number, draft: Partial<BlogEntity>) {
    const publishedBlog = this.findById(draft.publishId);
    draft.status = BlogStatus.PUBLISHED;
    if (!publishedBlog) {
      await this.blogRepository.update(id, draft);
      return ResultModel.builderSuccessMsg('发布成功');
    }
    await this.blogRepository.update(draft.publishId, draft);
    await this.deleteById(id);
    return ResultModel.builderSuccessMsg('发布成功');
  }
}
