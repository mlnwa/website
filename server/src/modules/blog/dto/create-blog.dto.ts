import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogFromStatus } from '../blog.enum';
import { TransformJsonNumberArr } from 'src/common/decorators';

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
  @TransformJsonNumberArr()
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
