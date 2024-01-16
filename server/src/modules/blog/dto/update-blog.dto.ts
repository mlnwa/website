import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogFromStatus } from '../blog.enum';
import { TypeUtil } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @IsOptional()
  @IsEnum(BlogFromStatus)
  @Type(() => Number)
  fromStatus: BlogFromStatus;

  @IsJSON()
  @IsOptional()
  @Transform(
    ({ value }) => {
      const parsedArray = JSON.parse(value);
      if (Array.isArray(parsedArray)) {
        if (!parsedArray.every(TypeUtil.isNumber)) {
          throw new HttpException({ message: 'Invalid input, expected a JSON number array' }, HttpStatus.BAD_REQUEST);
        }
        return parsedArray;
      } else {
        throw new HttpException({ message: 'Invalid input, expected a JSON number array' }, HttpStatus.BAD_REQUEST);
      }
    },
    { toPlainOnly: true },
  )
  tagIds: number[];

  @IsOptional()
  columnId: number;

  @IsOptional()
  @IsString()
  abstract: string;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableRecommend: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableComment: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enablePraise: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableCopyright: boolean;
}
