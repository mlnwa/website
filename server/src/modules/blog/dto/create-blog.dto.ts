import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogFromStatus } from '../blog.enum';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @IsNotEmpty()
  @IsEnum(BlogFromStatus)
  @Type(() => Number)
  fromStatus: BlogFromStatus;

  @IsOptional()
  tagIds: number[];
}
