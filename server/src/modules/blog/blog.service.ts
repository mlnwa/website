import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { BlogStatus } from './blog.enum';
import { QueryPagesBlogDto } from './dto/query-blog.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { BlogRepository } from './blog.repository';
import { BlogDetailVo, BlogPageVo } from './vo/blog-page.vo';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ColumnService } from '../column/column.service';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { TypeUtil } from 'src/utils';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private userService: UserService,
    private categoryService: CategoryService,
    private columnService: ColumnService,
    private tagService: TagService,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: number): Promise<ResultModel> {
    const { categoryId, tagIds, columnId, ...props } = createBlogDto;
    const blog = new BlogEntity();
    const userModel = await this.userService.findById(userId);
    if (userModel.getSuccess() == false) return userModel;
    blog.user = userModel.getResult();
    const categoryModel = await this.categoryService.findById(createBlogDto.categoryId);
    if (categoryModel.getSuccess() == false) return categoryModel;
    if (createBlogDto.tagIds?.length > 0) {
      const tagModel = await this.tagService.findByIds(createBlogDto.tagIds);
      if (tagModel.getSuccess() == false) return tagModel;
      blog.tags = tagModel.getResult();
    }
    blog.category = categoryModel.getResult();
    if (createBlogDto.columnId) {
      const columnModel = await this.columnService.findById(createBlogDto.columnId);
      if (columnModel.getSuccess() == false) return columnModel;
      blog.column = columnModel.getResult();
    }
    Object.assign(blog, props);
    await this.blogRepository.save(blog);
    return ResultModel.builderSuccessMsg('保存成功');
  }

  async findPages(queryPagesBlogDto: QueryPagesBlogDto) {
    const { pageIndex, pageSize } = queryPagesBlogDto;
    const resultModel = new ResultModel<PageInfo<BlogPageVo>>();
    const pageInfo = new PageInfo<BlogPageVo>({
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

  async findDetailById(id: number) {
    const res = await this.blogRepository.findBlogDetailById(id);
    if (!res) return ResultModel.builderErrorMsg('博客不存在');
    return ResultModel.builderSuccess<BlogDetailVo>().setResult(res);
  }

  async deleteById(id: number) {
    let res = await this.blogRepository.delete({ id });
    if (res.affected == 0) return ResultModel.builderErrorMsg('博客不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blogModel = await this.findById(id);
    if (blogModel.getSuccess() == false) return blogModel;
    const blog = blogModel.getResult() as BlogEntity;
    const { categoryId, tagIds, columnId, ...props } = updateBlogDto;
    if (TypeUtil.isNumber(categoryId)) {
      if (categoryId == 0) {
        blog.category = null;
      } else {
        let categoryModel = await this.categoryService.findById(categoryId);
        if (categoryModel.getSuccess() == false) return categoryModel;
        blog.category = categoryModel.getResult();
      }
    }
    if (TypeUtil.isArray(tagIds)) {
      if (tagIds.length == 0) {
        blog.tags = [];
      } else {
        let tagModels = await this.tagService.findByIds(tagIds);
        if (tagModels.getSuccess() == false) return tagModels;
        blog.tags = tagModels.getResult();
      }
    }
    if (TypeUtil.isNumber(columnId)) {
      if (columnId == 0) {
        blog.column = null;
      } else {
        let columnModel = await this.columnService.findById(columnId);
        if (columnModel.getSuccess() == false) return columnModel;
        blog.column = columnModel.getResult();
      }
    }
    Object.assign(blog, props);
    await this.blogRepository.save(blog);
    return ResultModel.builderSuccessMsg('更新成功');
  }

  async publish(id: number, draft: Partial<BlogEntity>) {
    const publishedBlogModel = await this.findById(draft.publishId);
    draft.status = BlogStatus.PUBLISHED;
    if (publishedBlogModel.getSuccess() == false) {
      await this.blogRepository.update(id, draft);
      return ResultModel.builderSuccessMsg('发布成功');
    }
    await this.blogRepository.update(draft.publishId, draft);
    await this.deleteById(id);
    return ResultModel.builderSuccessMsg('发布成功');
  }
  async addView(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) return;
    blog.viewCount += 1;
    await this.blogRepository.update(id, blog);
    return ResultModel.builderSuccess();
  }
}
