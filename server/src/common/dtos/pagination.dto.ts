import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  pageIndex: number;
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  pageSize: number;
}
