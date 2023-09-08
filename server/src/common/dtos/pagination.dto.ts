import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  pageIndex: number;
  @IsNotEmpty()
  pageSize: number;
}
