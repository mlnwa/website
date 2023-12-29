import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './blog.entity';
import { Request } from 'express';
import { BlogService } from './blog.service';
import { Public } from 'src/common/decorators/public.decorator';
import { BlogStatus } from './blog.enum';
import { UserService } from '../user/user.service';
import { QueryPagesBlogDto, QueryPagesPublishedBlogDto } from './dto/query-blog.dto';
import { CategoryService } from '../category/category.service';

@Controller('blog')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('/list/published')
  @Public()
  getPublishedBlogList(@Query() queryPagesBlogDto: QueryPagesBlogDto) {
    return this.blogService.findPages(queryPagesBlogDto);
  }

  @Get('/list')
  getBlogList(@Query() queryPagesPublishedBlogDto: QueryPagesPublishedBlogDto) {
    return this.blogService.findPages(queryPagesPublishedBlogDto);
  }

  @Get('/detail/:id')
  @Public()
  getBlogDetail(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.findById(id);
  }

  @Post()
  async createDraft(@Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
    const user = request.user as { userId: string };
    const userId = parseInt(user.userId);
    const userModel = await this.userService.findById(userId);
    if (userModel.getSuccess() == false) return userModel;
    const blog = createBlogDto as Partial<BlogEntity>;
    blog.user = userModel.getResult();
    const categoryModel = await this.categoryService.findById(createBlogDto.categoryId);
    if (categoryModel.getSuccess() == false) return categoryModel;
    blog.category = categoryModel.getResult();
    return this.blogService.create(blog);
  }

  @Put('/update/:id')
  updateDraft(@Body() createBlogDto: CreateBlogDto) {
    const draft = createBlogDto as Partial<BlogEntity>;
    return this.blogService.update(draft);
  }

  @Delete(':id')
  deleteBlog(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.deleteById(id);
  }

  @Put('/publish/:id')
  publishBlog(@Param('id', new ParseIntPipe()) id: number, @Body() createBlogDto: CreateBlogDto) {
    const draft = createBlogDto as Partial<BlogEntity>;
    return this.blogService.publish(id, draft);
  }
}
