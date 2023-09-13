import { Body, Controller, Delete, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatgoryService } from './catgory.service';
import { QueryPagesCatgoryDto } from './dto/query-catgory.dto';
import { CreateCatgoryDto } from './dto/create-catgory.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('catgory')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CatgoryController {
  constructor(private readonly catgoryService: CatgoryService) {}

  @Get()
  @Public()
  async getCatoryList(@Query() queryPagesCatgoryDto: QueryPagesCatgoryDto) {
    return this.catgoryService.queryPages(queryPagesCatgoryDto);
  }

  @Post()
  async createCatgory(@Body() createCatgoryDto: CreateCatgoryDto) {
    return this.catgoryService.create(createCatgoryDto);
  }

  @Delete()
  async deleteCatgory() {}

  @Put()
  async updateCatgory() {}
}
