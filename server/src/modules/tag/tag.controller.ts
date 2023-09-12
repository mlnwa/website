import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTagList(@Query() queryPagesTagDto: QueryPagesTagDto) {
    return this.tagService.queryPages(queryPagesTagDto);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }
}
