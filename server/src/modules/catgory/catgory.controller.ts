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

  @Delete(':id')
  async deleteCatgory(@Param('id', new ParseIntPipe()) id: number) {
    return this.catgoryService.deleteById(id);
  }

  @Put(':id')
  async updateCatgory(@Param('id', new ParseIntPipe()) id: number, @Body() createCatgoryDto: CreateCatgoryDto) {
    const catgory = {
      name: createCatgoryDto.name,
    };
    return this.catgoryService.update(id, catgory);
  }
}
