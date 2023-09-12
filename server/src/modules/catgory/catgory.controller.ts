import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatgoryService } from './catgory.service';
import { QueryPagesCatgoryDto } from './dto/query-catgory.dto';
import { CreateCatgoryDto } from './dto/create-catgory.dto';

@Controller('catgory')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CatgoryController {
  constructor(private readonly catgoryService: CatgoryService) {}

  @Get()
  async getCatoryList(@Query() queryPagesCatgoryDto: QueryPagesCatgoryDto) {
    return this.catgoryService.queryPages(queryPagesCatgoryDto);
  }

  @Post()
  async create(@Body() createCatgoryDto: CreateCatgoryDto) {
    return this.catgoryService.create(createCatgoryDto);
  }
}
