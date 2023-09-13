import { Body, Controller, Delete, Get, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './blog.entity';
import { Request } from 'express';
import { PaginationDto } from 'src/common/dtos';
import { BlogService } from './blog.service';
import { UserEntity } from '../user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('blogs')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Public()
  getBlogList(@Body() pagenationDto: PaginationDto) {
    return this.blogService.findPages(pagenationDto);
  }

  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
    const user = request.user as { userId: string };
    const userId = user.userId;
    const blog = JSON.parse(createBlogDto.data) as BlogEntity;
    blog.user = { id: userId } as unknown as UserEntity;
    this.blogService.create(blog);
  }

  @Put()
  updateBlog() {}

  @Delete()
  deleteBlog() {}
}
