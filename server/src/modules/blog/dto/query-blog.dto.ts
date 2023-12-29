import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';
import { BlogStatus } from '../blog.enum';

export class QueryPagesBlogDto extends PaginationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  @Type(() => Number)
  status?: BlogStatus;
}

export class QueryPagesPublishedBlogDto extends PaginationDto {}
