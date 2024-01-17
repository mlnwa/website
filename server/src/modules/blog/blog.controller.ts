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
import { QueryPagesBlogDto, QueryPagesPublishedBlogDto } from './dto/query-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/list/published')
  @Public()
  getPublishedBlogList(@Query() queryPagesPublishedBlogDto: QueryPagesPublishedBlogDto) {
    return this.blogService.findPages(queryPagesPublishedBlogDto);
  }

  @Get('/list')
  getBlogList(@Query() queryPagesBlogDto: QueryPagesBlogDto) {
    return this.blogService.findPages(queryPagesBlogDto);
  }

  @Get('/detail/:id')
  @Public()
  getBlogDetail(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.findDetailById(id);
  }

  @Post()
  async createDraft(@Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
    const user = request.user as { userId: string };
    const userId = parseInt(user.userId);
    return this.blogService.create(createBlogDto, userId);
  }

  @Put('/update/:id')
  updateDraft(@Param('id', new ParseIntPipe()) id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  deleteBlog(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.deleteById(id);
  }

  @Put('/publish/:id')
  publishBlog(@Param('id', new ParseIntPipe()) id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.publish(id, updateBlogDto);
  }
  @Put('/view/:id')
  addView(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.addView(id);
  }
}
