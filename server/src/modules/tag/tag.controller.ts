import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { TagService } from './tag.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('tag')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/list')
  @Public()
  getTagList(@Query() queryPagesTagDto: QueryPagesTagDto) {
    return this.tagService.queryPages(queryPagesTagDto);
  }

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Delete(':id')
  async deleteTag(@Param('id', new ParseIntPipe()) id: number) {
    return this.tagService.deleteById(id);
  }

  @Put('update/:id')
  async updateTag(@Param('id', new ParseIntPipe()) id: number, @Body() createTagDto: CreateTagDto) {
    const tag = {
      name: createTagDto.name,
    };
    return this.tagService.update(id, tag);
  }
}
