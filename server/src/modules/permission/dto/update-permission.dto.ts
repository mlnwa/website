import { Transform } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => value === 'true', { toPlainOnly: true })
  enable: boolean;
}
