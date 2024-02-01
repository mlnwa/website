import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * @deprecated
 */
export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
