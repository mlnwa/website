import { Body, Controller, Delete, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { TagService } from './tag.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('tag')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @Public()
  getTagList(@Query() queryPagesTagDto: QueryPagesTagDto) {
    return this.tagService.queryPages(queryPagesTagDto);
  }

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Delete()
  async deleteTag() {}

  @Put()
  async updateTag() {}
}
