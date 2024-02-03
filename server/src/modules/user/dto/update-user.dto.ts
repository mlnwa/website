import { IsEmail, IsJSON, IsOptional, IsString } from 'class-validator';
import { TransformJsonNumberArr } from 'src/common/decorators';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsJSON()
  @TransformJsonNumberArr()
  roleIds?: number[];

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  emailCode: string;
}
