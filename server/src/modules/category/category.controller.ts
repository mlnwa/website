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
import { CategoryService } from './category.service';
import { QueryPagesCategoryDto } from './dto/query-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('category')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCatoryList(@Query() queryPagesCategoryDto: QueryPagesCategoryDto) {
    return this.categoryService.queryPages(queryPagesCategoryDto);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.deleteById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createCategoryDto: Partial<CreateCategoryDto>,
  ) {
    return this.categoryService.update(id, createCategoryDto);
  }
}
