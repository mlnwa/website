import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class QueryPagesTagDto extends PaginationDto {
  @IsString()
  @Type(() => String)
  title?: string = '';
}
