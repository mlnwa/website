import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class QueryPagesPermissionDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name: string;
}
