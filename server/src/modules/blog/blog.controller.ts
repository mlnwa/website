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
import { PaginationDto } from 'src/common/dtos';
import { BlogService } from './blog.service';
import { UserEntity } from '../user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { BlogStatus } from './blog.enum';
import { UserService } from '../user/user.service';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesTagDto } from './dto/query-blog.dto';

@Controller('blogs')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class BlogController {
  constructor(private readonly blogService: BlogService, private readonly userService: UserService) {}

  @Get(':status')
  @Public()
  getBlogList(
    @Param('status', new ParseIntPipe()) status: BlogStatus,
    @Query(ValidationPipe) queryPagesTagDto: QueryPagesTagDto,
  ) {
    return this.blogService.findPages(status, queryPagesTagDto);
  }

  @Post()
  async createDraft(@Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
    const user = request.user as { userId: string };
    const userId = parseInt(user.userId);
    const userModel = await this.userService.findById(userId);
    if (userModel.getSuccess() == false) return userModel;
    const blog = JSON.parse(createBlogDto.data) as Partial<BlogEntity>;
    blog.user = userModel.getResult();
    return this.blogService.create(blog);
  }

  @Put('/update/:id')
  updateDraft(@Body() createBlogDto: CreateBlogDto) {
    const draft = JSON.parse(createBlogDto.data) as Partial<BlogEntity>;
    return this.blogService.update(draft);
  }

  @Delete(':id')
  deleteBlog(@Param('id', new ParseIntPipe()) id: number) {
    return this.blogService.deleteById(id);
  }

  @Put('/publish/:id')
  publishBlog(@Param('id', new ParseIntPipe()) id: number, @Body() createBlogDto: CreateBlogDto) {
    const draft = JSON.parse(createBlogDto.data) as Partial<BlogEntity>;
    return this.blogService.publish(id, draft);
  }
}
