import { Transform, Type, plainToClass, plainToInstance } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  isNumber,
} from 'class-validator';
import { BlogFromStatus } from '../blog.enum';
import { BlogEntity } from '../blog.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeUtil } from 'src/utils';

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

  @IsString()
  abstract: string;

  @IsString()
  imgUrl: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableRecommend: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableComment: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enablePraise: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  enableCopyright: boolean;
}
