import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateColumnDto } from './dto/create-column.dto';
import { QueryPagesColumnDto } from './dto/query-column.dto';

@Controller('column')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get('/list')
  @Public()
  getColumnList(@Query(ValidationPipe) queryColumnPagesDto: QueryPagesColumnDto) {
    return this.columnService.queryPages(queryColumnPagesDto);
  }

  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Put(':id')
  updateColumn(@Param('id', new ParseIntPipe()) id: number, @Body() createColumnDto: CreateColumnDto) {
    return this.columnService.update(id, createColumnDto);
  }

  @Delete(':id')
  deleteColumn(@Param('id', new ParseIntPipe()) id: number) {
    return this.columnService.deleteById(id);
  }
}
