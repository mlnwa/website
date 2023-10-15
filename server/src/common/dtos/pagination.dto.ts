import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  pageIndex: number;
  @IsNotEmpty()
  @IsInt()
  pageSize: number;
}
