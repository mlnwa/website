import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogFromStatus } from '../blog.enum';
import { TransformJsonNumberArr } from 'src/common/decorators';

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
  @TransformJsonNumberArr()
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
