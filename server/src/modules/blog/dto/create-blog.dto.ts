import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  columnId: number;

  @IsString()
  abstract: string;

  @IsString()
  imgUrl: string;

  @IsBoolean()
  @Type(() => Boolean)
  enableRecommend: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  enableComment: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  enablePraise: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  enableCopyright: boolean;
}
