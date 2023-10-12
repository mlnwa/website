import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { PaginationDto } from 'src/common/dtos';
import { BlogStatus } from './blog.enum';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async create(blog: Partial<BlogEntity>): Promise<ResultModel> {
    await this.blogRepository.save(blog);
    return ResultModel.builderSuccessMsg('保存成功');
  }

  async findPages(paginationDto: PaginationDto) {}

  async findById(id: number) {
    return await this.blogRepository.findOne({ where: { id } });
  }

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
