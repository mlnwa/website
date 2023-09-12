import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async create(blog: BlogEntity): Promise<ResultModel> {
    await this.blogRepository.save(blog);
    return ResultModel.builderSuccessMsg('新增成功');
  }

  async findPages(paginationDto: PaginationDto) {}

  async findById() {}
}
